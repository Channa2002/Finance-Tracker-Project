
import { currencyFormatter } from "@/libs/utils";
import {Modal} from "@/Components/Modal";
import {FaRegTrashAlt} from "react-icons/fa";
import { useRef, useContext} from "react";
import {financeContext} from "@/libs/store/finance-context";
import { authContext } from "@/libs/store/auth-context";

// Firebase



export function AddIncomeModal({show, onClose}) {

    const amountRef = useRef();
    const descriptionRef = useRef();
    const {income, addIncomeItem, removeIncomeItem} = useContext(financeContext);

    const {user} = useContext(authContext);

    const addIncomeHandler = async (e) => {
        e.preventDefault();
    
        const newIncome = {
          amount: +amountRef.current.value,
          description: descriptionRef.current.value,
          createdAt: new Date(),
          uid: user.uid
        };
       try {
        await addIncomeItem(newIncome);
        descriptionRef.current.value = "";
        amountRef.current.value = ""; 
       } catch (error) {
        console.log(error.message)
       }
      };
    
      const deleteIncomeEntryHandler = async (incomeId) => {
        try {
            await removeIncomeItem(incomeId);
        } catch (error) {
            console.log(error.message);
        }
      };

    
    
    return (
        <Modal show={show} onClose={onClose} >
          <form onSubmit={addIncomeHandler} className="input-group">
            <div className="input-group">
              <label htmlFor="amount">Income Amount</label>
              <input
              ref={amountRef}
              type="number" 
              name="amount"
              min={0.01} 
              step={0.01} 
              placeholder="Enter income amount" 
              required />
            </div>

            <div className="flex flex-col gap-4">
              <label htmlFor="description">Description</label>
              <input
              ref={descriptionRef}
              type="text" 
              name="description"
              placeholder="Enter income description" 
              required />
            </div>


            <button type="submit" className="btn btn-primary">
              Add entry
            </button>
            
          </form>

          <div className="flex flex-col gap-4 mt-6 ">
            <h3 className="text-2xl font-bold">Income History</h3>
            {income.map((i) => {
              return (
                <div key={i.id} className="flex items-center justify-between">
                  <div className="flex flex-col">
                      <p className="font-bold capitalize">{i.description}</p>
                      <small className="font-semibold">{i.createdAt.toISOString()}</small>
                  </div>
                 <div className="flex items-center justify-between gap-3">
                      <p>{currencyFormatter(i.amount)}</p>
                     <button onClick={() => {deleteIncomeEntryHandler(i.id)}}>
                      <FaRegTrashAlt />
                     </button> 
                 </div>
              </div>
              )
            })}




          </div>

          </Modal >
    )
}