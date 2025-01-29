import {
  Button,
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Permissions() {
  const [Clients, setClients] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState({}); // إدارة الأدوار لكل مستخدم

  const roles = ["المدير", "المسؤول", "المخلص", "المستخدم", "خدمة العملاء"];

  // دالة لتحديث الأدوار لكل مستخدم
  const handleRoleChange = (event, userId) => {
    const {
      target: { value },
    } = event;

    setSelectedRoles((prev) => ({
      ...prev,
      [userId]: typeof value === "string" ? value.split(",") : value, // تحديث أدوار المستخدم المحدد
    }));
  };

  // جلب البيانات من API
  const GetClients = async () => {
    try {
      const response = await axios.get("https://takhleesak.runasp.net/api/Get-User", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
        },
      });
      setClients(response.data);

      // تهيئة الأدوار للمستخدمين عند تحميل البيانات
      const initialRoles = response.data.reduce((acc, user) => {
        acc[user.id] = []; // تعيين مصفوفة فارغة لكل مستخدم
        return acc;
      }, {});
      setSelectedRoles(initialRoles);
    } catch (error) {
      console.error("Error fetching clients:", error);
    }
  };

  useEffect(() => {
    GetClients();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h2 className="text-center mb-4">إدارة الصلاحيات</h2>
            <TableContainer>
              <Table className="w-100" aria-label="permissions table">
                <TableHead>
                  <TableRow className="text-center">
                    <TableCell>اسم المستخدم</TableCell>
                    <TableCell>البريد الإلكتروني</TableCell>
                    <TableCell>الأدوار</TableCell>
                    <TableCell>المسمى الوظيفي</TableCell>
                    <TableCell align="right">حفظ</TableCell>
                    <TableCell align="right">تخصيص الصلاحيات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Clients.map((user) => (
                    <TableRow key={user.id} className="text-center">
                      <TableCell>{user.fullName}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Select
                          labelId={`role-select-label-${user.id}`}
                          id={`role-select-${user.id}`}
                          multiple
                          value={selectedRoles[user.id] || []} // الأدوار الخاصة بهذا المستخدم
                          onChange={(event) => handleRoleChange(event, user.id)}
                          renderValue={(selected) => selected.join(", ")}
                        >
                          {roles.map((roleName) => (
                            <MenuItem key={roleName} value={roleName}>
                              <Checkbox
                                checked={selectedRoles[user.id]?.includes(roleName) || false}
                              />
                              <ListItemText primary={roleName} />
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell>{user.jobTitle}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={() => {
                            console.log(
                              `تم حفظ الصلاحيات للمستخدم ${user.fullName}:`,
                              selectedRoles[user.id] || []
                            );
                            toast(`تم حفظ الصلاحيات للمستخدم ${user.fullName}`);
                          }}
                        >
                          حفظ
                        </Button>
                      </TableCell>
                      <TableCell align="right">
                        <Button variant="contained" color="success" size="small">
                          تخصيص الصلاحيات
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </>
  );
}
