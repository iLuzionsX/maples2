import assert from 'node:assert/strict';
import { ActionController } from '../src/game/ActionController.js';
import { ENEMY_ACTIONS, PLAYER_ACTIONS, PLAYER_INPUT_TTLS, resolvePlayerInput } from '../src/game/ActionDefinitions.js';

function playerController(mana = 100) {
  const context = { mana, dead: false };
  return { context, controller: new ActionController({ actions: PLAYER_ACTIONS, inputResolver: resolvePlayerInput, context }) };
}

function step(controller, worldDt, realDt = worldDt) {
  controller.advanceReal(realDt);
  controller.advanceWorld(worldDt);
}

function dispatchBuffered(controller) {
  const ready = controller.peekReadyInput();
  if (!ready) return null;
  assert.equal(controller.start(ready.actionId, { payload: ready.payload }), true);
  controller.consumeBufferedInput(ready.serial);
  return ready;
}

{
  const { controller } = playerController();
  assert.equal(controller.start('attack1'), true);
  assert.equal(controller.state, 'attack');
  assert.equal(controller.comboIndex, 0);
}

{
  const { controller } = playerController();
  controller.start('attack1');
  step(controller, 0.12);
  assert.equal(controller.consumeEvent('strike'), null);
  step(controller, 0.02);
  assert.equal(controller.consumeEvent('strike')?.name, 'strike');
  step(controller, 0.08);
  assert.equal(controller.consumeEvent('strike'), null);
}

{
  const { controller } = playerController();
  controller.start('attack1');
  step(controller, 0.39);
  controller.bufferInput('attack', null, PLAYER_INPUT_TTLS.attack);
  assert.equal(dispatchBuffered(controller)?.actionId, 'attack2');
  step(controller, 0.43);
  controller.bufferInput('attack', null, PLAYER_INPUT_TTLS.attack);
  assert.equal(dispatchBuffered(controller)?.actionId, 'attack3');
}

{
  const { controller } = playerController();
  controller.start('attack1');
  step(controller, 0.39);
  controller.advanceReal(0.73);
  controller.bufferInput('attack', null, PLAYER_INPUT_TTLS.attack);
  assert.equal(controller.peekReadyInput()?.actionId, 'attack1');
}

{
  const { controller } = playerController();
  controller.start('attack1');
  step(controller, 0.24);
  controller.bufferInput('attack', { marker: 1 }, PLAYER_INPUT_TTLS.attack);
  assert.equal(controller.peekReadyInput(), null);
  step(controller, 0.13);
  assert.equal(controller.peekReadyInput(), null);
  step(controller, 0.02);
  assert.equal(controller.peekReadyInput()?.actionId, 'attack2');
}

{
  const { controller } = playerController();
  controller.start('attack1');
  step(controller, 0.05);
  controller.bufferInput('attack', null, PLAYER_INPUT_TTLS.attack);
  controller.advanceReal(0.17);
  controller.advanceWorld(0.01);
  assert.equal(controller.bufferedInput, null);
}

{
  const { controller } = playerController();
  controller.start('attack1');
  controller.bufferInput('attack', { id: 'old' }, PLAYER_INPUT_TTLS.attack);
  controller.bufferInput('dodge', { id: 'new' }, PLAYER_INPUT_TTLS.dodge);
  assert.equal(controller.bufferedInput.input, 'dodge');
  assert.equal(controller.bufferedInput.payload.id, 'new');
}

{
  const { controller } = playerController();
  controller.start('attack1');
  step(controller, 0.17);
  controller.bufferInput('dodge', null, PLAYER_INPUT_TTLS.dodge);
  assert.equal(controller.peekReadyInput(), null);
  step(controller, 0.02);
  assert.equal(controller.peekReadyInput()?.actionId, 'dodge');
  const ready = dispatchBuffered(controller);
  assert.equal(ready.actionId, 'dodge');
  assert.equal(controller.state, 'dodge');
}

{
  const { controller } = playerController();
  controller.start('dodge');
  step(controller, 0.39);
  assert.equal(controller.isInvulnerable, true);
  step(controller, 0.02);
  assert.equal(controller.isInvulnerable, false);
  assert.equal(controller.state, 'dodge');
  step(controller, 0.04);
  assert.equal(controller.state, 'idle');
}

{
  const { controller, context } = playerController(25);
  assert.equal(controller.canStart('cast'), false);
  context.mana = 26;
  assert.equal(controller.start('cast'), true);
  assert.equal(controller.cooldown('spell'), 2.35);
  step(controller, 0.35);
  assert.equal(controller.canStart('cast'), false);
  controller.advanceReal(2.01);
  assert.equal(controller.canStart('cast'), true);
}

{
  const { controller } = playerController();
  controller.start('attack1');
  assert.equal(controller.start('cast'), true);
  assert.equal(controller.state, 'cast');
  assert.equal(controller.consumeEvent('strike'), null);
}

{
  const { controller } = playerController();
  controller.start('cast');
  assert.equal(controller.start('attack1'), true);
  assert.equal(controller.state, 'attack');
}

{
  const { controller } = playerController();
  controller.start('attack1');
  controller.bufferInput('attack', null, PLAYER_INPUT_TTLS.attack);
  controller.clearBufferedInput();
  assert.equal(controller.start('hurt', { force: true, skipCooldown: true }), true);
  assert.equal(controller.state, 'hurt');
  assert.equal(controller.canStart('attack1'), false);
}

{
  const { controller, context } = playerController();
  controller.start('attack1');
  context.dead = true;
  assert.equal(controller.start('dead', { force: true, skipCooldown: true }), true);
  assert.equal(controller.state, 'dead');
  assert.equal(controller.canStart('cast'), false);
  assert.equal(controller.canStart('attack1'), false);
}

{
  const { controller } = playerController();
  controller.start('attack1');
  step(controller, 0.39);
  assert.equal(controller.state, 'idle');
}

{
  const { controller } = playerController();
  controller.start('attack1');
  assert.equal(controller.movementScale, 0.34);
  assert.equal(controller.turnScale, 1);
  controller.start('attack3', { force: true, skipCooldown: true });
  assert.equal(controller.movementScale, 0.16);
  assert.equal(controller.turnScale, 0);
}

{
  const { controller } = playerController();
  controller.start('attack1');
  controller.bufferInput('attack', null, PLAYER_INPUT_TTLS.attack);
  controller.advanceReal(0.17);
  controller.advanceWorld(0.01);
  assert.equal(controller.time, 0.01);
  assert.ok(Math.abs(controller.cooldown('attack') - 0.05) < 1e-9);
  assert.equal(controller.bufferedInput, null);
  assert.ok(controller.comboDeadline > 0.54 && controller.comboDeadline < 0.56);
}

{
  const controller = new ActionController({ actions: ENEMY_ACTIONS });
  controller.start('briarStrike');
  controller.advanceWorld(0.51);
  assert.equal(controller.hasPendingEvent('strike'), false);
  controller.advanceWorld(0.02);
  assert.equal(controller.consumeEvent('strike')?.name, 'strike');
  assert.equal(controller.consumeEvent('strike'), null);
}

{
  const controller = new ActionController({ actions: ENEMY_ACTIONS });
  controller.start('briarStrike');
  controller.advanceWorld(0.3);
  controller.stop();
  controller.advanceWorld(0.4);
  assert.equal(controller.consumeEvent('strike'), null);
  assert.equal(controller.start('briarStrike'), true);
  controller.advanceWorld(0.53);
  assert.equal(controller.consumeEvent('strike')?.name, 'strike');
}

console.log('ACTION CONTROLLER UNIT PASS');
