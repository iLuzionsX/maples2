import * as THREE from 'three';

const V = THREE.Vector3;
const clamp = THREE.MathUtils.clamp;

function canonicalName(value = '') {
  return String(value).toLowerCase().replace(/[^a-z0-9]/g, '');
}

function findRigNode(root, candidates) {
  if (!root) return null;
  const wanted = candidates.map(canonicalName);
  let exact = null;
  let fuzzy = null;

  root.traverse(node => {
    if (exact) return;
    const name = canonicalName(node.name);
    if (!name) return;
    if (wanted.includes(name)) exact = node;
    else if (!fuzzy && wanted.some(candidate => name.includes(candidate))) fuzzy = node;
  });

  return exact || fuzzy;
}

function initializeFootState(footState, bone, player) {
  footState.bone = bone;
  const world = bone.getWorldPosition(new V());
  footState.baseClearance = clamp(world.y - player.root.position.y, .035, .32);
  footState.groundY = player.root.position.y;
  footState.lock = null;
  footState.hit = null;
}

/**
 * KayKit/Blender/GLTF exporters can spell the same authored foot bones as
 * Foot.L, Foot_L, DEF-foot.L, LeftFoot, mixamorigLeftFoot, etc. Rowan's
 * animation director intentionally owns all animation/IK behavior; this layer
 * only reconciles imported node naming when the director could not resolve the
 * two foot bones on its first pass.
 */
export function installRowanRigCompatibility(game, manager) {
  const player = game.player;
  const baseUpdate = player.update.bind(player);
  let repairedModel = null;

  player.update = (...args) => {
    const result = baseUpdate(...args);
    const state = manager?.state;

    if (state?.model && state.model !== repairedModel && !manager.footIKReady) {
      const left = state.bones.footL || findRigNode(state.model, [
        'foot.l', 'foot_l', 'footl', 'leftfoot', 'lfoot', 'leftankle',
      ]);
      const right = state.bones.footR || findRigNode(state.model, [
        'foot.r', 'foot_r', 'footr', 'rightfoot', 'rfoot', 'rightankle',
      ]);

      if (left && right) {
        state.bones.footL = left;
        state.bones.footR = right;
        initializeFootState(state.foot.left, left, player);
        initializeFootState(state.foot.right, right, player);
        manager.footIKReady = true;
        manager.skeletalRigReady = Boolean(state.bones.hips && state.bones.spine && left && right);
        repairedModel = state.model;
        console.info('[Rowan rig compatibility] resolved imported foot bones', {
          left: left.name,
          right: right.name,
        });
      }
    }

    return result;
  };

  return manager;
}
