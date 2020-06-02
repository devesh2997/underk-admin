import Employee from "models/Employee";
import Role from "models/Role";
import Policy from "models/Policy";

export default interface Admin {
  auid: string;
  alias: string;
  employee?: Employee;
  roles: Role[];
  policies: Policy[];
  created_at: Date;
  updated_at: Date;
}
