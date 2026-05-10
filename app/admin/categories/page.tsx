import AdminCrud from "@/components/AdminCrud";
export default function Page(){return <AdminCrud title="Categories" endpoint="/api/categories" fields={[{name:"name",label:"Нэр"},{name:"order",label:"Дараалал",type:"number"},{name:"imageUrl",label:"Зураг",type:"image"}]}/>}
