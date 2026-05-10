import AdminCrud from "@/components/AdminCrud";
export default function Page(){return <AdminCrud title="Banners" endpoint="/api/banners" fields={[{name:"title",label:"Гарчиг"},{name:"subtitle",label:"Тайлбар"},{name:"link",label:"Линк"},{name:"order",label:"Дараалал",type:"number"},{name:"imageUrl",label:"Зураг",type:"image"}]}/>}
