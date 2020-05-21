import { objectify, stringify, numify } from "../utils";

export default class Policy {
  id: number;
  name: string;
  description: string;

  constructor(policy: any) {
    policy = objectify(policy);

    this.id = numify(policy.id);
    this.name = stringify(policy.name);
    this.description = stringify(policy.description);
  }

  toMapForSelectableOpt = () => {
    return {
      value: this.name,
      label: this.name,
    };
  };
}
