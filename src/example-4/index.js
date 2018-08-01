// Existed code
const onPresence = presence => {
  let presenceStatus = 'offline';
  if (presence.getAttribute('type') === 'unavailable') {
    presenceStatus = 'offline';
  } else if (presence.getElementsByTagName('status').length === 0) {
    presenceStatus = 'online';
  } else {
    switch (presence.getElementsByTagName('status')[0].childNodes[0].nodeValue) {
      case 'Away': presenceStatus = 'away'; break;
      case 'Online': presenceStatus = 'online'; break;
      case 'Free to chat': presenceStatus = 'online'; break;
      default: presenceStatus = 'offline';
    }
  }
  const from = Strophe.getBareJidFromJid(presence.getAttribute('from'));
  this.subscribersForPresence.forEach(subscriber => subscriber(from, presenceStatus));
  return true;
}


// After refactoring
const OFFLINE = 'offline';
const ONLINE = 'online';
const AWAY = 'away';

const getPresenceStatus = () => {
  const type = presence.getAttribute('type');

  return type === 'unavailable' ? OFFLINE : getStatusFromNodeValue();
}

const getStatusFromNodeValue = () => {
  const status = presence.getElementsByTagName('status');

	if (status.length) {
    switch (status[0].childNodes[0].nodeValue) {
      case 'Away':
        return AWAY;
      case 'Online':
        return ONLINE;
      case 'Free to chat':
        return ONLINE;
      default:
        return OFFLINE;
    }
  }

  return ONLINE;
}

const subscribe = () => {
	const from = Strophe.getBareJidFromJid(presence.getAttribute('from'));
  const presenceStatus = getPresenceStatus();

	this.subscribersForPresence.forEach(subscriber => subscriber(from, presenceStatus));
}
