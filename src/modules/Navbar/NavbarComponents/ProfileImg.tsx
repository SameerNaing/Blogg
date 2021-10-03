import React from "react";
import { Avatar } from "@chakra-ui/avatar";

interface Props {
  /** username */
  name: string;
  /** user profile pic */
  src: string;
}

/** Profile pic avatar */
const ProfileImg: React.FC<Props> = ({ name, src }) => {
  return (
    <>
      <Avatar data-cy="navbar-avatar-pic" name={name} src={src} />
    </>
  );
};

export default ProfileImg;
