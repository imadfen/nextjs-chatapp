-- CreateTable
CREATE TABLE "UserRoom" (
    "member_id" TEXT NOT NULL,
    "room_id" TEXT NOT NULL,

    CONSTRAINT "UserRoom_pkey" PRIMARY KEY ("member_id","room_id")
);

-- AddForeignKey
ALTER TABLE "UserRoom" ADD CONSTRAINT "UserRoom_member_id_fkey" FOREIGN KEY ("member_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRoom" ADD CONSTRAINT "UserRoom_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Room"("room_id") ON DELETE RESTRICT ON UPDATE CASCADE;
