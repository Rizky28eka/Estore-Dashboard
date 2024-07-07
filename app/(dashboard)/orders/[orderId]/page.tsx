// Import komponen DataTable dari lokasi tertentu
import { DataTable } from "@/components/custom ui/DataTable";
// Import kolom yang akan ditampilkan dari lokasi tertentu
import { columns } from "@/components/orderItems/OrderItemsColums";

// Komponen OrderDetails yang menampilkan detail pesanan berdasarkan orderId
const OrderDetails = async ({ params }: { params: { orderId: string } }) => {
  // Mengambil detail pesanan dari API berdasarkan orderId
  const res = await fetch(
    `${process.env.ADMIN_DASHBOARD_URL}/api/orders/${params.orderId}`
  );
  const { orderDetails, customer } = await res.json();

  // Mengambil detail alamat pengiriman dari orderDetails
  const { street, city, state, postalCode, country } =
    orderDetails.shippingAddress;

  // Mengembalikan tampilan halaman OrderDetails dengan informasi pesanan dan detail produk menggunakan DataTable
  return (
    <div className='flex flex-col p-10 gap-5'>
      <p className='text-base-bold'>
        Order ID: <span className='text-base-medium'>{orderDetails._id}</span>
      </p>
      <p className='text-base-bold'>
        Customer name: <span className='text-base-medium'>{customer.name}</span>
      </p>
      <p className='text-base-bold'>
        Shipping address:{" "}
        <span className='text-base-medium'>
          {street}, {city}, {state}, {postalCode}, {country}
        </span>
      </p>
      <p className='text-base-bold'>
        Total Paid:{" "}
        <span className='text-base-medium'>${orderDetails.totalAmount}</span>
      </p>
      <p className='text-base-bold'>
        Shipping rate ID:{" "}
        <span className='text-base-medium'>{orderDetails.shippingRate}</span>
      </p>
      {/* Menggunakan komponen DataTable untuk menampilkan detail produk dari pesanan */}
      <DataTable
        columns={columns}
        data={orderDetails.products}
        searchKey='product'
      />
    </div>
  );
};

// Ekspor komponen OrderDetails agar dapat digunakan di tempat lain
export default OrderDetails;
