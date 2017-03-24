import * as commands from './commands';

export default function(event, {command, args}) {
    const commandFunction = commands[command];

    if(typeof commandFunction !== 'function') {
      console.log(`No command ${command}`);
      return;
    }

    commandFunction.apply(undefined, args);
}
