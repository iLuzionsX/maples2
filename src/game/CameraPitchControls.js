export const CAMERA_PITCH_MIN = -0.72;
export const CAMERA_PITCH_MAX = 0.68;
export const CAMERA_PITCH_SENSITIVITY = 0.00165;

export function nextCameraPitch(currentPitch, lookY, sensitivity = CAMERA_PITCH_SENSITIVITY) {
  const next = currentPitch - lookY * sensitivity;
  return Math.max(CAMERA_PITCH_MIN, Math.min(CAMERA_PITCH_MAX, next));
}

export function installCameraPitchControls(game) {
  if (game.cameraPitchControls) return game.cameraPitchControls;

  const state = game.cameraPitchControls = {
    desiredPitch: nextCameraPitch(game.cameraPitch, 0),
  };

  const originalConsumeLook = game.input.consumeLook.bind(game.input);
  game.input.consumeLook = () => {
    const look = originalConsumeLook();
    state.desiredPitch = nextCameraPitch(state.desiredPitch, look.y);

    // Game's legacy frame loop still applies its old pitch clamp. Keep horizontal
    // look flowing through that path, but own vertical pitch here so the camera can
    // reach the expanded upward range without changing movement or look sensitivity.
    return { x: look.x, y: 0 };
  };

  const originalUpdateCamera = game._updateCamera.bind(game);
  game._updateCamera = dt => {
    // Re-apply the desired pitch after the legacy frame clamp and immediately before
    // camera placement. Mobile combat focus can still adjust pitch inside its wrapper;
    // capture that result afterward so assisted recentering remains authoritative.
    game.cameraPitch = state.desiredPitch;
    const result = originalUpdateCamera(dt);
    state.desiredPitch = nextCameraPitch(game.cameraPitch, 0);
    return result;
  };

  return state;
}
