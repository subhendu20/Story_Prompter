import { createSlice } from '@reduxjs/toolkit';

interface State {
          value: number;
          status:boolean;
        }
        
        const initialState: State = {
          value: 0,
          status:false
        };
        
        const counterSlice = createSlice({
          name: 'counter',
          initialState,
          reducers: {
            increment: (state) => {
              state.value += 1;
            },
            decrement: (state) => {
              state.value -= 1;
            },
            chageLogIn:(state)=>{
                    state.status=true
            },
            chageLogOut:(state)=>{
                    state.status=false
            }
          },
        });
        
        export const { increment, decrement, chageLogIn, chageLogOut } = counterSlice.actions;
        export const selectCount = (state: { counter: State }) => state.counter.value;
        export const selectStatus = (state:{counter:State})=>state.counter.status
        export default counterSlice.reducer;