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
  buyMultiplyerStore: () => void,
  nextMultiplyerCost: number

}

const useStoreCoins = create<Store>((set, get) => ({
  coins: 0,
  noAsyncCoins: 0,
  multiplyer: 1,
  nextMultiplyerCost: 0,
  addCoins: async () => {
    try {
      axios.post("http://tg.realfast.click:8080/click", { user_id: 1461324815, clicks: 1 });
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
        { user_id: 1461324815 }
      );
      console.log(data.data);
      set((state) => ({
        coins: data.data,
      }));

    } catch (error) {
      console.error("Error in getBalance:", error);
    }
  },

  registerUser: async () => {
    try {
      const data = await axios.post("http://tg.realfast.click:8080/register", { user_id: 1461324815 });
      console.log("Registration data:", data);
    } catch (error) {
      console.error("Error in registerUser:", error);
    }
  },

  getMultiplyer: async () => {
    try {
      const response = await axios.post("http://tg.realfast.click:8080/get_multiplyer", { user_id: 1461324815 });
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


      const response = await axios.post("http://tg.realfast.click:8080/buy_multiplyer", { user_id: 1461324815 });
      console.log(response.data);
      set((state) => ({
        multiplyer: state.multiplyer + 1,
        nextMultiplyerCost: response.data
      }));

    } catch (error) {
      console.error("Error in getMultiplyer:", error);
    }
  },
}));

export default useStoreCoins;