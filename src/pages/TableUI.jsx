import React from "react";
import { ChevronDown } from "lucide-react";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function TableUI() {
  return (
    <div className="bg-white border rounded-md">

      {/* SCROLL CONTAINER */}
      <div className="overflow-x-auto">

        <table className="min-w-[1500px] text-sm">

          {/* HEADER */}
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3 text-left">CLIENT NAME</th>
              <th className="px-4 py-3">CLIENT CODE</th>
              <th className="px-4 py-3">Mobile</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Pan Number</th>
              <th className="px-4 py-3">Call</th>
              <th className="px-4 py-3">Message</th>
              <th className="px-4 py-3">Whatsapp</th>
              <th className="px-4 py-3">Remark</th>
              <th className="px-4 py-3">Mobile App</th>
              <th className="px-4 py-3">Sip</th>
              <th className="px-4 py-3">Reason Mobile App Download</th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>

            <tr className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">JASPAL SINGH GOUD</td>
              <td className="px-4 py-3 text-center">AP050001</td>
              <td className="px-4 py-3 text-center">XXXXXX4934</td>
              <td className="px-4 py-3 text-center">jd****@****.com</td>
              <td className="px-4 py-3 text-center">ASXXXXXM</td>

              {/* CALL */}
              <td className="px-4 py-3 text-center">
                <i className="fas fa-mobile-alt cursor-pointer"></i>
              </td>

              {/* MESSAGE */}
              <td className="px-4 py-3 text-center">
                <div className="relative w-32 mx-auto">
                  <select className="w-full border rounded px-2 py-1 appearance-none">
                    <option>Select</option>
                    <option>Interested</option>
                    <option>Not Interested</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-2 text-gray-500 pointer-events-none"
                  />
                </div>
              </td>

              {/* WHATSAPP */}
              <td className="px-4 py-3 text-center">
                <div className="bg-green-600 w-8 h-8 flex items-center justify-center rounded">
                  <i className="fab fa-whatsapp text-white"></i>
                </div>
              </td>

              {/* REMARK */}
              <td className="px-4 py-3">
                <input className="border w-full px-2 py-1 rounded" />
              </td>

              {/* MOBILE APP */}
              <td className="px-4 py-3 text-center">No</td>

              {/* SIP */}
              <td className="px-4 py-3 text-center">
                <input type="checkbox" />
              </td>

              {/* REASON */}
              <td className="px-4 py-3">
                <input
                  className="border w-full px-2 py-1 rounded"
                  placeholder="Enter reason"
                />
              </td>
            </tr>

            <tr className="border-t hover:bg-gray-50">
              <td className="px-4 py-3">PRITAM JAIN</td>
              <td className="px-4 py-3 text-center">AP050002</td>
              <td className="px-4 py-3 text-center">XXXXXX8408</td>
              <td className="px-4 py-3 text-center">pr****@****.com</td>
              <td className="px-4 py-3 text-center">ABXXXXJ</td>

              <td className="px-4 py-3 text-center">
                <i className="fas fa-mobile-alt cursor-pointer"></i>
              </td>

              <td className="px-4 py-3 text-center">
                <div className="relative w-32 mx-auto">
                  <select className="w-full border rounded px-2 py-1 appearance-none">
                    <option>Select</option>
                    <option>Interested</option>
                    <option>Not Interested</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-2 top-2 text-gray-500 pointer-events-none"
                  />
                </div>
              </td>

              <td className="px-4 py-3 text-center">
                <div className="bg-green-600 w-8 h-8 flex items-center justify-center rounded">
                  <i className="fab fa-whatsapp text-white"></i>
                </div>
              </td>

              <td className="px-4 py-3">
                <input className="border w-full px-2 py-1 rounded" />
              </td>

              <td className="px-4 py-3 text-center">No</td>

              <td className="px-4 py-3 text-center">
                <input type="checkbox" />
              </td>

              <td className="px-4 py-3">
                <input className="border w-full px-2 py-1 rounded" />
              </td>
            </tr>

          </tbody>
        </table>

      </div>
    </div>
  );
}
