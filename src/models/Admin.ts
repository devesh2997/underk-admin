import { objectify, stringify, arrify } from "../utils";
import Policy from "./Policy";
import Role from "./Role";
import Employee from "./Employee";

export default class Admin {
  auid: string;
  alias: string;
  employee: Employee | null;
  roles: Role[];
  policies: Policy[];
  createdAt: string;
  updatedAt: string;

  constructor(admin: any) {
    admin = objectify(admin);

    this.auid = stringify(admin.auid);
    this.alias = stringify(admin.alias);
    this.employee = new Employee(admin.employee);
    this.roles = arrify(admin.roles).map((role) => new Role(role));
    this.policies = arrify(admin.policies).map((policy) => new Policy(policy));
    this.createdAt = stringify(admin.created_at);
    this.updatedAt = stringify(admin.updated_at);
  }
}
