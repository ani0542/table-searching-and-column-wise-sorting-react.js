import React, { useEffect, useState, useMemo } from "react";
import Paginations from "./Paginations"
import Searchs from './Searchs'
import TableHeader from "./TableHeader";



function DataTable() {
    
    const [comments, setComments] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });

    console.log(sorting,'sorting')
    
    const ITEMS_PER_PAGE = 50;

    // console.log(currentPage,'currentPage')

        const headers = [
            { name: "No#", field: "id", sortable: false },
            { name: "Name", field: "name", sortable: true },
            { name: "Email", field: "email", sortable: true },
            { name: "Comment", field: "body", sortable: false }
        ];


        //  let arr=[];

        // for(const item of headers){
        //    arr.push(item['name'])
        // }

        // console.log(arr)


      useEffect(() => {
        const getData = () => {
            // showLoader();

            fetch("https://jsonplaceholder.typicode.com/comments")
                .then(response => response.json())
                .then(json => {
                    // hideLoader();
                    setComments(json);
                    // console.log(json);
                });
        };

        getData();
    }, []);




    const renderCommentsData =(value)=>{
        return (
            <>
                               <tr>
                                    <th scope="row" key={value.id}>
                                        {value.id}
                                    </th>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>{value.body}</td>
                                </tr> 
            </>
        )
    }






     const commentsData = useMemo(() => {
        let computedComments = comments;
        setTotalItems(computedComments.length);

        if (search) {
            computedComments = computedComments.filter(
                comment =>
                    comment.name.toLowerCase().includes(search.toLowerCase()) ||
                    comment.email.toLowerCase().includes(search.toLowerCase())
            );
        }

         //Sorting comments
         if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedComments = computedComments.sort(
                (a, b) =>
                    reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }

        return computedComments.slice(
            (currentPage - 1) * ITEMS_PER_PAGE,
            (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        );
  
    }, [comments,currentPage,search,sorting]);



    const handleSearch =(value)=>{
        setSearch(value);
        setCurrentPage(1);
    }


    

    //  console.log(search,'search')

    
    return (
        <>
                <div className="row w-100">
                <div className="col mb-3 col-12 text-center">
                    <div className="row">
                        <div className="col-md-6">
                           
                            <Paginations
                                total={totalItems}
                                itemsPerPage={ITEMS_PER_PAGE}
                                currentPage={currentPage}
                                onPageChange={page => setCurrentPage(page)}
                            />
                            
                        </div>
                        <div className="col-md-6 d-flex flex-row-reverse">
                            <Searchs
                                
                                onSearch={handleSearch}
                            />
                            
                        </div>
                    </div>

                    <table className="table table-striped">
                       
                        <TableHeader
                          headers={headers}
                          onSorting={(field, order) =>
                            setSorting({ field, order })
                        }
                       
                        />
                        <tbody>
                            {
                                commentsData.map(renderCommentsData)
                            }
                           
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default DataTable
