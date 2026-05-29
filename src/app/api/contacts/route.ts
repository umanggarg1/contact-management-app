import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try{
    const contacts = await prisma.contact.findMany();

    return NextResponse.json({
      success: true,
      data: contacts,
    });
  }catch(error){
    
    console.error("Error fetching contacts:", error);

    return NextResponse.json({
      success: false,
      message: "Failed to fetch contacts",
    }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.firstName || !body.userId) {
      return NextResponse.json(
        {
          success: false,
          message: "firstName and userId are required",
        },
        { status: 400 }
      );
    }

    const contact = await prisma.contact.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        userId: body.userId,
      },
    });

    return NextResponse.json({
      success: true,
      data: contact,
    });
  } catch (error) {
    console.log("CREATE CONTACT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error,
        message: "Failed to create contact",
      },
      { status: 500 }
    );
  }
}