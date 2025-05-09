import { atomWithStorage, createJSONStorage } from "jotai/utils";
import type { User } from "../types/user";

const storage = createJSONStorage<User | undefined>(() => sessionStorage);

// prettier-ignore
export const userAtom = atomWithStorage<User | undefined>("user", undefined, storage);
