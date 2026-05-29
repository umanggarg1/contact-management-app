import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    
    const body = await req.json();

    // validation
    if (!body.email || !body.password) {
      return NextResponse.json(
        {
          success: false,
          message: "Email and password are required",
        },
        { status: 400 }
      );
    }

    // check existing user
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists",
        },
        { status: 409 }
      );
    }

    // create user
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password, // later hash this
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("CREATE USER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error,
        message: "Failed to create user",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: {
        contacts: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: users,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("GET USERS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error,
        message: "Failed to fetch users",
      },
      { status: 500 }
    );
  }
}