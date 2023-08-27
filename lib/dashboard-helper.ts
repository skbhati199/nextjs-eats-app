import { OrderStatus, PrismaClient } from "@prisma/client";
import {
  addMonths,
  startOfMonth,
  endOfMonth,
  addWeeks,
  subWeeks,
  startOfWeek,
  endOfWeek,
} from "date-fns";

const prisma = new PrismaClient();

export async function getTotalRevenue(): Promise<number> {
  const currentDate = new Date();
  const lastMonthStartDate = startOfMonth(addMonths(currentDate, -1));
  const lastMonthEndDate = endOfMonth(addMonths(currentDate, 1));
  const result = await prisma.order.aggregate({
    _sum: {
      totalAmount: true,
    },
    where: {
      createAt: {
        gte: lastMonthStartDate,
        lt: lastMonthEndDate,
      },
    },
  });

  return result._sum.totalAmount || 0;
}

export async function getSubscriptionsCount(): Promise<number> {
  const subscriptionsCount = await prisma.user.count({
    where: {
      subscription: true,
    },
  });
  return subscriptionsCount || 0;
}

export async function getSalesCount(): Promise<number> {
  const salesCount = await prisma.order.count();
  return salesCount || 0;
}

export async function getActiveNowCount(): Promise<number> {
  const activeNowCount = await prisma.user.count();
  return activeNowCount || 0;
}

export interface IBarChart {
  orders: number[];
  labels: string[];
}

export async function getOrdersDataForLastFourWeeks(): Promise<IBarChart> {
  const currentDate = new Date();
  const weeksAgo = subWeeks(currentDate, 1);
  let label: string[] = [];

  const ordersData = await Promise.all(
    Array.from({ length: 4 }).map(async (_, index) => {
      const weekStartDate = startOfWeek(addWeeks(currentDate, -index));
      const weekEndDate = endOfWeek(addWeeks(currentDate, -index));

      const day = weekStartDate.toLocaleDateString("en-US", { day: "2-digit" });
      const month = weekStartDate.toLocaleDateString("en-US", {
        month: "short",
      });

      label.push(`${day} ${month}`);
      const result = await prisma.order.aggregate({
        _sum: {
          totalAmount: true,
        },
        where: {
          createAt: {
            gte: weekStartDate,
            lte: weekEndDate,
          },
        },
      });

      return result._sum.totalAmount || 0;
    })
  );

  return { orders: ordersData, labels: label };
}

export async function getLastSixUsersWithOrders() {
  const usersWithOrders = await prisma.user.findMany({
    where: {
      orders: {
        some: {
          orderStatus: {
            not: OrderStatus.REJECTED,
          },
        },
      },
    },
    orderBy: {
      id: "desc",
    },
    select: {
      id: true,
      name: true,
      email: true,
      orders: {
        where: {
          orderStatus: {
            not: OrderStatus.REJECTED,
          },
        },
        orderBy: {
          createAt: "desc",
        },
        take: 1, 
        select: {
          totalAmount: true,
        },
      },
    },
    take: 6, // Limit the result to 6 users
  });

  return usersWithOrders;
}
