import { create } from "zustand";
import axios from "axios";
import { log } from "node:console";

interface Store {
  coins: number,
  noAsyncCoins: number,
  multiplyer: number,
  addCoins: () => void,
  getBalance: () => void,
  registerUser: () => void,
  getMultiplyer: () => void,
}

const useStoreCoins = create<Store>((set, get) => ({ // Added `get` to the function
  coins: 0,
  noAsyncCoins: 0,
  multiplyer: 1,
  addCoins: async () => {
    try {
      await axios.post("http://tg.realfast.click:8080/click", { user_id: 1461324815, click: 1 });  // Use get().multiplyer


      set((state) => ({
        coins: state.coins + get().multiplyer,
        noAsyncCoins: state.noAsyncCoins + get().multiplyer,
      }));
    } catch (error) {
      console.error("Error in addCoins:", error);
    }
  },

  getBalance: async () => {
    try {
      const data = await axios.post("http://tg.realfast.click:8080/get_balance",
        JSON.stringify({ user_id: 1461324815 }),
        {
          headers: {
            'Content-Type': 'application/json',

          },
          withCredentials: true
        },
      );
      console.log(data.data);


    } catch (error) {
      console.error("Error in getBalance:", error);
    }
  },

  registerUser: async () => {
    try {
      const data = await axios.post("http://tg.realfast.click:8080/register", { user_id: 1461324815 });
      // console.log("Registration data:", data);
    } catch (error) {
      console.error("Error in registerUser:", error);
    }
  },

  getMultiplyer: async () => {
    try {
      const response = await axios.post("http://tg.realfast.click:8080/get_multiplyer", { user_id: 1461324815 });
      set({ multiplyer: response.data });
    } catch (error) {
      console.error("Error in getMultiplyer:", error);
    }
  },
}));

export default useStoreCoins;