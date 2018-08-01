// before

getIcon (group) {
  let icon = null;

  if (group.admin === this.props.jid) {
    if (group.admin === this.props.jid && group.password) {
      if (group.admin === this.props.jid && group.password && group.anonymous) {
        icon = <Groups color={gray} isWithoutBg colorAdmin={blueDark} colorKey={blueDark} colorAnonymous={blueDark} />;
      } else {
        icon = <Groups color={gray} isWithoutBg colorAdmin={blueDark} colorKey={blueDark} />;
      }
    } else {
      if (group.admin === this.props.jid && group.anonymous) {
        icon = <Groups color={gray} isWithoutBg colorAdmin={blueDark} colorAnonymous={blueDark} />;
      } else {
        icon = <Groups color={gray} isWithoutBg colorAdmin={blueDark} />;
      }
    }
  } else {
    if (group.password) {
      if (group.password && group.anonymous) {
        icon = <Groups color={gray} isWithoutBg colorKey={blueDark} colorAnonymous={blueDark} />;
      } else {
        icon = <Groups color={gray} isWithoutBg colorKey={blueDark} />;
      }
    } else {
      if (group.anonymous) {
        icon = <Groups color={gray} isWithoutBg colorAnonymous={blueDark} />;
      } else {
        icon = <Groups color={gray} isWithoutBg />;
      }
    }
  }

  return icon;
}

// after improvement
getIcon (group) {
  const isAdmin = group.admin === this.props.jid;
  const isAnonymous = Boolean(group.anonymous);
  const isPasswordExist = Boolean(group.password);

  const someProps = {
    colorAdmin: isAdmin ? blueDark : undefined, // eslint-disable-line
    colorAnonymous: isAnonymous ? blueDark : undefined, // eslint-disable-line
    colorKey: isPasswordExist ? blueDark : undefined // eslint-disable-line
  };

  return <Groups color={gray} isWithoutBg {...someProps} />;
}
