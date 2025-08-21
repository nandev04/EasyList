declare module "*.svg" {
  import React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const content: string; // Para uso como URL
  export { ReactComponent };
  export default content;
}
