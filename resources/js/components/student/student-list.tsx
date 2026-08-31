import { Link } from "@inertiajs/react";
import { AtSign, Phone } from "lucide-react";
import type { Students } from "@/types/student";
import CalculateAge from "@/utils/calcul-age";
import { useRoute } from "ziggy-js";
import { PaginationLinks } from "../pagination-links";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table";


export const StudentList = ({ students }: { students: Students }) => {
    const route = useRoute();
    
    return (
        <div
            className="mt-8"
        >
            <div>Search</div>
            <div>
                <Table>
                    <TableHeader>
                        <TableRow
                            className="font-bold"
                        >
                            <TableHead>Photo</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Age</TableHead>
                            <TableHead>Gender</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Address</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.data.map(student => (
                            <TableRow
                                key={student.id}
                                className="relative"
                            >
                                <TableCell
                                    className="w-10 h-10"
                                >
                                    <div className="rounded-full overflow-hidden">
                                        <img
                                            src={
                                                student.photo
                                                    ? `/storage/${student.photo}`
                                                    :'/storage/images/student/student-default.png'
                                            }
                                            className="object-center object-cover"
                                            alt={student.name}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    {student.name}
                                </TableCell>
                                <TableCell>
                                    {CalculateAge(student.dob)}
                                </TableCell>
                                <TableCell>
                                    {student.gender}
                                </TableCell>
                                <TableCell
                                    className="text-xs"
                                >
                                    
                                    <p className="flex gap-1.5"><AtSign size={12} /> { student.email }</p>
                                    <p className="flex gap-1.5"><Phone size={12} /> { student.phone }</p>
                                </TableCell>
                                <TableCell>
                                    {student.address}
                                </TableCell>
                                <Link
                                    href={route('grade.showStudent',  student.id)}
                                >
                                    <span
                                        className="absolute inset-0"
                                    ></span>
                                </Link>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <PaginationLinks objects={students}/>
            </div>
        </div>
    )
}