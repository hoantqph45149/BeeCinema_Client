import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  ChevronDown,
  FolderClock,
  IdCard,
  LockKeyhole,
  LogOut,
  UserPen,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCRUD } from "../../Hooks/useCRUD";
import { useAuthContext } from "../../Contexts/auth/UseAuth";

function ProfileDropdownClient() {
  const { create: logout } = useCRUD(["logout"]);
  const { authUser, setAuthUser } = useAuthContext();
  const user = authUser.user;

  const handleLogout = () => {
    logout.mutate(
      {
        url: "/logout",
        data: {},
        shouldShowAlert: false,
      },
      {
        onSuccess: () => {
          localStorage.removeItem("user");
          setAuthUser(null);
        },
      }
    );
  };
  return (
    <Menu>
      <MenuButton className="flex items-center space-x-2 text-primary font-semibold">
        <span>Xin chào : {user.name}</span>{" "}
        <ChevronDown size={20} strokeWidth={3} />
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="w-64 bg-white border rounded-lg shadow-lg"
      >
        {user.role === "admin" && (
          <MenuItem>
            <Link
              className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
              href="/settings"
            >
              <LockKeyhole size={16} strokeWidth={1.5} className="mr-2" /> Truy
              Cập Trang Quản Trị
            </Link>
          </MenuItem>
        )}
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            href="/support"
          >
            <UserPen size={16} strokeWidth={1.5} className="mr-2" /> Thông Tin
            Tài Khoản
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            href="/license"
          >
            <IdCard size={16} strokeWidth={1.5} className="mr-2" /> Thẻ Thành
            Viên
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
            href="/license"
          >
            <FolderClock size={16} strokeWidth={1.5} className="mr-2" />
            Lịch Sử Đặt Vé
          </Link>
        </MenuItem>
        <MenuItem>
          <Link
            onClick={handleLogout}
            className="px-4 py-4 text-sm hover:bg-gray-100 flex items-center"
          >
            <LogOut size={16} strokeWidth={1.5} className="mr-2" /> Đăng Xuất
          </Link>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}

export default ProfileDropdownClient;
