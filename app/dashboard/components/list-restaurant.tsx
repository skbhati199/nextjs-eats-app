import { Restaurant } from "@prisma/client";
import ResturantItemCard from "./item-restaurant";

interface ListResturantProps {
  data: Restaurant[];
}

const ListResturant = ({ data }: ListResturantProps) => {
  console.log(data);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
      {data.map((item) => (
        <ResturantItemCard key={item.id} data={item} />
      ))}
    </div>
  );
};

export default ListResturant;
