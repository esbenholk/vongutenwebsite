import PortableText from "react-portable-text";
import React from "react";
import Image from "./image";

function BlockContent({ blocks }) {
  return (
    <PortableText
      content={blocks}
      projectId="f3dx0phm"
      dataset="production"
      serializers={{
        image: (props) => <Image image={props} width={500} />,
      }}
    />
  );
}

export default BlockContent;
