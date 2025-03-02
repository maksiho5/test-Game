import { create } from "zustand";
import axios from "axios";
import { log } from "node:console";

interface Store {
  coins: number,
  noAsyncCoins: number,
  multiplyer: number,
  nextMultiplyerCost: number,
  userId: number
  leaderboard: Array<{ name: string, coins: number | string, place: string | number }>
  addUserId: (el: number) => void
  addCoins: () => void,
  getBalance: () => void,
  registerUser: () => void,
  getMultiplyer: () => void,
  buyMultiplyerStore: () => void,
  leaderboardGet: () => void
}

const useStoreCoins = create<Store>((set, get) => ({
  coins: 0,
  noAsyncCoins: 0,
  multiplyer: 1,
  nextMultiplyerCost: 0,
  leaderboard: [],
  userId: 0,

  addUserId: async (el: number) => {
    set((state) => ({
      userId: el
    }));
  },

  addCoins: async () => {
    try {
      console.log(get().userId);
      
      axios.post("https://tg.realfast.click/click", { user_id: get().userId, clicks: 1 });
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
      const userId = get().userId;
      const data = await axios.post("https://tg.realfast.click/get_balance", { user_id: userId });
      set({ coins: data.data });
    } catch (error) {
      console.error("Error in getBalance:", error);
    }
  },

  registerUser: async () => {
    try {
      const data = await axios.post("https://tg.realfast.click/register", { user_id: get().userId });
      console.log("Registration data:", data);
    } catch (error) {
      console.error("Error in registerUser:", error);
    }
  },

  getMultiplyer: async () => {
    try {
      const response = await axios.post("https://tg.realfast.click/get_multiplyer", { user_id: get().userId });
      console.log(response.data);

      set({
        multiplyer: response.data.multiplyer,
        nextMultiplyerCost: response.data.next_multiplyer_cost
      });
    } catch (error) {
      console.error("Error in getMultiplyer:", error);
    }
  },
  buyMultiplyerStore: async () => {
    try {


      const response = await axios.post("https://tg.realfast.click/buy_multiplyer", { user_id: get().userId });
      console.log(response.data);
      get().getBalance()
      set((state) => ({
        multiplyer: state.multiplyer + 1,
        nextMultiplyerCost: response.data,
      }));

    } catch (error) {
      console.error("Error in getMultiplyer:", error);
    }
  },

  leaderboardGet: async () => {
    const response = await axios.post("https://tg.realfast.click/get_leaderboard");
  console.log(response.data);
  
    set((state) => ({
      leaderboard: response.data
    }));
  }
}));

export default useStoreCoins;