import React, { useContext, useEffect, useState } from 'react'
import { GlobalContex } from '../../../../store/Contex'

const SmsItem = ({ item, index }) => {
    const { data } = useContext(GlobalContex)
    useEffect(() => {
            item?.objects.map(item => item.warehouse?.id).map((elem) => {
                data.push(
                    {
                        product_id: item?.id,
                        warehouse_id: elem,
                        amount: item?.amount,
                    }
                )
            })

    }, [])
    const [checkValue, setCheckValue] = useState(false)
    const [inputValue, setInputValue] = useState({})
   


    const changeValue = (e) => {
        setInputValue({
            ...inputValue,
            [e.target.name]: e.target.value
        })
    }


    const [success, setSuccess] = useState(false)
    const checkInputValue = (a, b) => {
        if (a > b) {
            return true
        } else {
            return false
        }
    }






    return (
        <tr key={item?.id}>
            <td col-md-1>{index + 1}</td>
            <td col-md-2>{item?.name}</td>
            <td col-md-2>{item?.amount} {item?.size}</td>
            <td col-md-2>
                {item?.objects?.map((elem) => (
                    <div className='d-flex align-items-center gap-2'>
                        <div className='shed_item mt-1'>
                            {elem?.warehouse?.name}
                            <span>
                                {elem?.amount} {elem?.size}
                            </span>
                        </div>
                        <div className='price_shed'>
                            {item?.objects?.length > 1 &&
                                <input
                                    className='amount'
                                    name={`amount${elem?.warehouse?.id}`}
                                    value={inputValue?.[`amount${elem?.warehouse?.id}`]}
                                    onChange={changeValue}
                                    max={elem?.amount}
                                    style={{
                                        borderColor: checkInputValue(inputValue?.[`amount${elem?.warehouse?.id}`], elem?.amount)
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
                    item?.objects?.length === 1 ?
                        <p className='mb-0'> {item?.amount} {item?.size}</p> :
                        <p className='mb-0'>{success ? "tori" : "xato"}</p>
                }
            </td>
            <td>
                {/* <div onClick={checkPush}>{checkValue ? "tanlangan" : "tanlash"}</div> */}
            </td>
        </tr>
    )
}

export default SmsItem