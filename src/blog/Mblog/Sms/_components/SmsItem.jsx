import React, { useContext, useEffect, useState } from 'react'
import { GlobalContex } from '../../../../store/Contex'

const SmsItem = ({ item, index, comparison, }) => {
    const { data } = useContext(GlobalContex)

    const filterData = comparison?.filter((elem) => elem?.id === item?.id)
    const [checkValue, setCheckValue] = useState(false)
    const [inputValue, setInputValue] = useState({})
    const test = Object?.values(inputValue)?.map((item) => Number(item))
    const allPrice = test?.reduce((a, b) => a + b, 0)
    const checkPush = () => {
        setCheckValue((prev) => !prev)
        if (!checkValue) {
            if (filterData?.length === 1) {
                data.push({
                    product_id: item?.id,
                    warehouse_id: filterData?.[0]?.warehouse?.id,
                    amount: item?.amount,
                })
            } else {
                filterData?.map((elem) => {
                    test.map((num) => {
                        data.push({
                            product_id: item?.id,
                            warehouse_id: elem?.warehouse?.id,
                            amount: num,
                        })
                    })

                })
            }
        }
    }



    const changeValue = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })
    }
    // let test = inputValue?.reduce((a,b) => Number(a) + Number(b));


    const [success, setSuccess] = useState(false)
    const checkPrice = () => {
        if (item?.amount === allPrice) {
            return true
        } else {
            return false
        }
    }

    const checkInputValue = (a, b) => {
        if (a > b) {
            return true
        } else {
            return false
        }
    }





    // if (test1) {
    //     if (filterData?.length === 1) {
    //         setAllProduct((prev) => [...prev, {
    //             product_id: item?.id,
    //             warehouse_id: filterData[0]?.warehouse?.id,
    //             amount: item?.amount,
    //         }])
    //     } else {
    //         filterData?.map((elem) => {
    //             setAllProduct((prev) => [...prev,
    //             {
    //                 product_id: item?.id,
    //                 warehouse_id: elem?.warehouse?.id,
    //                 amount: item?.amount,
    //             }
    //             ])
    //         })
    //     }
    //     return
    // }




    return (
        <tr key={item?.id}>
            <td col-md-1>{index + 1}</td>
            <td col-md-2>{item?.name}</td>
            <td col-md-2>{item?.amount} {item?.size}</td>
            <td col-md-2>
                {filterData?.map((item) => (
                    <div className='d-flex align-items-center gap-2'>
                        <div className='shed_item mt-1'>
                            {item?.warehouse?.name}
                            <span>
                                {item?.amount} {item?.size}
                            </span>
                        </div>
                        <div className='price_shed'>
                            {filterData?.length > 1 &&
                                <input
                                    className='amount'
                                    name={`amount${item?.warehouse?.id}`}
                                    value={inputValue?.[`amount${item?.warehouse?.id}`]}
                                    onChange={changeValue}
                                    max={item?.amount}
                                    style={{
                                        borderColor: checkInputValue(inputValue?.[`amount${item?.warehouse?.id}`], item?.amount)
                                            ?
                                            "red" : "green"
                                    }}
                                />
                            }
                        </div>
                    </div>
                ))
                }
            </td>
            <td col-md-2>
                {
                    filterData?.length === 1 ?
                        <p className='mb-0'> {item?.amount} {item?.size}</p> :
                        <p className='mb-0'>{success ? "tori" : "xato"}</p>
                }

            </td>
            <td>
                <div onClick={checkPush}>{checkValue ? "tanlangan" : "tanlash"}</div>
            </td>
        </tr>
    )
}

export default SmsItem