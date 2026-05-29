import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const contact = await prisma.contact.findUnique({
      where: {
        id,
      },
    });

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: contact,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("GET CONTACT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error,
        message: "Failed to fetch contact",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const contact = await prisma.contact.delete({
      where: {
        id,
      },
    });

    if (!contact) {
      return NextResponse.json(
        {
          success: false,
          message: "Contact not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,  
        message: "Contact deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("DELETE CONTACT ERROR:", error);
    
    return NextResponse.json(
      {
        success: false,
        error,
        message: "Failed to delete contact",
      },

        { status: 500 }     
    );
  } 

}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const contact = await prisma.contact.update({
      where: {
        id,
      },
      data: body,
    });

    return NextResponse.json(
      {
        success: true,
        data: contact,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("UPDATE CONTACT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error,
        message: "Failed to update contact",
      },
      { status: 500 }
    );
  }
}
