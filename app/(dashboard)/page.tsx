// Mengimpor komponen SalesChart dari komponen kustom
import SalesChart from "@/components/custom ui/SalesChart";
// Mengimpor komponen Card, CardContent, CardHeader, dan CardTitle dari komponen UI card
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Mengimpor komponen Separator dari komponen UI separator
import { Separator } from "@/components/ui/separator";
// Mengimpor fungsi getSalesPerMonth, getTotalCustomers, dan getTotalSales dari actions/actions
import {
  getSalesPerMonth,
  getTotalCustomers,
  getTotalSales,
} from "@/lib/actions/actions";
// Mengimpor ikon CircleDollarSign, ShoppingBag, dan UserRound dari lucide-react
import { CircleDollarSign, ShoppingBag, UserRound } from "lucide-react";

// Fungsi Home sebagai halaman utama dashboard
export default async function Home() {
  // Mengambil totalRevenue dari hasil getTotalSales()
  const totalRevenue = await getTotalSales().then((data) => data.totalRevenue);
  // Mengambil totalOrders dari hasil getTotalSales()
  const totalOrders = await getTotalSales().then((data) => data.totalOrders);
  // Mengambil totalCustomers dari getTotalCustomers()
  const totalCustomers = await getTotalCustomers();

  // Mengambil graphData dari getSalesPerMonth()
  const graphData = await getSalesPerMonth();

  // Render tampilan halaman Home
  return (
    <div className='px-8 py-10'>
      <p className='text-heading2-bold'>Dashboard</p>
      <Separator className='bg-grey-1 my-5' />

      {/* Grid untuk menampilkan Card dengan informasi total */}
      <div className='grid grid-cols-2 md:grid-cols-3 gap-10'>
        {/* Card untuk menampilkan Total Revenue */}
        <Card>
          <CardHeader className='flex flex-row justify-between items-center'>
            <CardTitle>Total Revenue</CardTitle>
            <CircleDollarSign className='max-sm:hidden' />
          </CardHeader>
          <CardContent>
            <p className='text-body-bold'>$ {totalRevenue}</p>
          </CardContent>
        </Card>

        {/* Card untuk menampilkan Total Orders */}
        <Card>
          <CardHeader className='flex flex-row justify-between items-center'>
            <CardTitle>Total Orders</CardTitle>
            <ShoppingBag className='max-sm:hidden' />
          </CardHeader>
          <CardContent>
            <p className='text-body-bold'>{totalOrders}</p>
          </CardContent>
        </Card>

        {/* Card untuk menampilkan Total Customers */}
        <Card>
          <CardHeader className='flex flex-row justify-between items-center'>
            <CardTitle>Total Customer</CardTitle>
            <UserRound className='max-sm:hidden' />
          </CardHeader>
          <CardContent>
            <p className='text-body-bold'>{totalCustomers}</p>
          </CardContent>
        </Card>
      </div>

      {/* Card untuk menampilkan Sales Chart */}
      <Card className='mt-10'>
        <CardHeader>
          <CardTitle>Sales Chart ($)</CardTitle>
        </CardHeader>
        <CardContent>
          <SalesChart data={graphData} />
        </CardContent>
      </Card>
    </div>
  );
}
