"use client"

import {currencyFormatter} from "@/libs/utils";
import {ExpenseCategoryItem} from "@/Components/ExpenseCategory";
import {
  Chart as ChartJS, 
  ArcElement, 
  Tooltip, 
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { AddIncomeModal } from "@/Components/modals/AddIncomeModal";
import { useState, useContext, useEffect } from "react";

import {financeContext} from "@/libs/store/finance-context";
import {authContext} from "@/libs/store/auth-context";

import AddExpensesModal from "@/Components/modals/AddExpensesModal";
import SignIn from "@/Components/SignIn";
import Loader from "../Components/Loader";







ChartJS.register(ArcElement, Tooltip, Legend);


export default function Home() {

  const [showAddIncomeModal, setShowAddIncomeModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [balance, setBalance] =useState(0);
  
  const {expenses, income} = useContext(financeContext);
  const {user, loading} = useContext(authContext);

  useEffect(() => {
    const newBalance = 
     income.reduce((total, i) => {
      return total + i.amount;
     }, 0) - 
     expenses.reduce((total, e) => {
      return total + e.total;
     }, 0);
     setBalance(newBalance);
  }, [expenses, income])
 


  if (loading) return <div className="flex items-center justify-center"><Loader /></div>;

  if (!user) {
   return <SignIn />;
  }
  return (
    <> 
    {/* Add Income Modal*/} 
         <AddIncomeModal show={showAddIncomeModal} onClose={setShowAddIncomeModal} />
         <AddExpensesModal show={showAddExpenseModal} onClose={setShowAddExpenseModal}/>

          <main className="container max-w-2xl px-6 mx-auto">
            <section className="py-3">
                  <small className="text-gray-400 text-md"> My Balance</small>
                  <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
            </section>

            <section className="flex items-center gap-2 py-3">
                <button className="btn btn-primary" onClick={() => setShowAddExpenseModal(true)} > + Expenses </button>
                <button className="btn btn-primary-outline" onClick={() => setShowAddIncomeModal(true)}> + Income </button>
            </section>
              
            {/* Expensenses */}
            <section className="py-6">
                <h3 className="text-2xl">My Expenses</h3>
                <div className="flex flex-col gap-4 mt-6">
                  {/* Expense Item */}
                  {
                    expenses.map(expense => {
                      return (
                        <ExpenseCategoryItem
                          key={expense.id}
                          expense={expense}
                      />
                      )
                    })
                  }
                  
                </div>
            </section>

            {/* Chart Section */}
            <section className="py-6">
              <h3 className="text-2xl">Stats</h3>
              <div className="w-1/2 mx-auto">
                <Doughnut data={{
                  labels: expenses.map(expense => expense.title),
                  datasets:[
                    {
                      label: "Expenses",
                      data: expenses.map(expense => expense.total),
                      backgroundColor: expenses.map(expense => expense.color),
                      borderColor:["#18181b"],
                      borderWidth:5,

                    }
                  ]
                }} />
              </div>
            </section>

          </main>
    </>
   
   
  );
}
