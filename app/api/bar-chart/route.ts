import { getOrdersDataForLastFourWeeks } from "@/lib/dashboard-helper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        const ordersData = await getOrdersDataForLastFourWeeks();
        return NextResponse.json(ordersData)
    } catch (error) {
        console.error(error);
        return NextResponse.json("ERROR_BAR_CHAR", { status: 500 })
    }
}