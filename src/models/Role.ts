import { objectify, stringify, arrify, numify } from "../utils";
import Policy from "./Policy";

export default class Role {
  id: number;
  name: string;
  description: string;
  policies: Policy[];

  constructor(role: any) {
    role = objectify(role);

    this.id = numify(role.id);
    this.name = stringify(role.name);
    this.description = stringify(role.description);
    this.policies = arrify(role.policies).map((policy) => new Policy(policy));
  }

  toMapForSelectableOpt = () => {
    return {
      value: this.id.toString(),
      label: this.name,
    };
  };
}
