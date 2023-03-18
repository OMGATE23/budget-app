import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteItem } from "../helper";

export function logoutAction(){
    deleteItem({key : "userName"})
    toast.success('Logout Successful')
    return redirect('/')
}