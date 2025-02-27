import axios from "axios";
import { useEffect, useState } from "react";
import { Table, Form, Card } from "react-bootstrap";

const roles = ["محاسب", "خدمة عملاء", "مدير", "مسؤول"];

const initialUsers = [
  { id: 1, name: "أحمد علي", role: "محاسب" },
  { id: 2, name: "سارة محمد", role: "خدمة عملاء" },
  { id: 3, name: "كريم حسن", role: "مدير" },
  { id: 4, name: "ليلى محمود", role: "مسؤول" },
];

export default function Permissions() {
  const [users, setUsers] = useState(initialUsers);

  
  const CustomerService = async () => {
    try {
      const { data } = await axios.get(
        `https://takhleesak.runasp.net/api/Get-User`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("Tokken")}`,
          },
        }
      );
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
  };

  useEffect(() => {
    CustomerService()
  }, [])
  

  return (
    <Card className="p-4 shadow-lg rounded text-center">
      <h2 className="text-xl font-bold mb-4 text-center">إدارة الصلاحيات</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>الاسم</th>
            <th>الصلاحية</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.fullName}</td>
              <td>
                <Form.Select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
  );
}
