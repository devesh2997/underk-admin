import Policy from "models/Policy";

export default interface Role {
  id: number;
  name: string;
  description: string;
  policies: Policy[];
}
