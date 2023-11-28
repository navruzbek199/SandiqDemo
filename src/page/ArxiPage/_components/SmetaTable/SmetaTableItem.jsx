import React, { useState } from 'react'
import SelectSearch from "react-select-search";
import apiRoot from '../../../../store/apiRoot';
const SmetaTableItem = ({options,item,index,lastIndex,setCount,count,setAllPrice,allprice,setTotalPrice}) => {
    const [size, setSize] = useState()
    const active = index === lastIndex
    const [inputValues,setInputValues] = useState({
        size: '',
        amount: 0,
        name: "",
        price: 0
    })
    const sub = () =>{
        const allPriceitem = inputValues?.amount * inputValues?.price
        if(allPriceitem > 0){
            setAllPrice(prev => prev += allPriceitem)
            setCount([...count, inputValues])
            if(allprice){
                setTotalPrice((prev) => prev += allprice )
            }else{
                setTotalPrice((prev) => prev += allPriceitem )
           
            }
        }
    
    }
    const onChange = (e) => {
        const value = e.target.value
        setInputValues({
            ...inputValues,
            ["size"]: size,
            [e.target.name]: value
        })
    }
    const allPriceTotal = inputValues?.amount * inputValues?.price

   

    return (
        <>
            <tr>
                <td>
                    <div className="form_group_cost">
                    {index + 1}
                    </div>
                </td>
                <td>
                    <div className="form_group">
                        <input
                            type="text"
                            name='name'
                            placeholder='Введите название продукта'
                            disabled={!active}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                </td>
                <td>
                    <div className='form_group'>
                        <SelectSearch
                            options={options}
                            value={size}
                            onChange={setSize}
                            search
                            placeholder="Выберите единицу!"
                            disabled={!active}

                        />
                    </div>
                </td>
                <td>
                    <div className="form_group">
                        <input
                            type="number"
                            placeholder='Введите количество !'
                            onChange={(e) => onChange(e)}
                            name='amount'
                            disabled={!active}

                        />
                    </div>
                </td>
                <td>
                    <div className="form_group">
                        <input
                            type="number"
                            placeholder='Введите цену !'
                            onChange={(e) => onChange(e)}
                            name='price'
                            disabled={!active}

                        />
                    </div>
                </td>
                <td>
                    <div className="form_group_cost">
                        {
                            active ? 
                            <button className='btn' onClick={sub}>Добавить</button> :

                            allPriceTotal?.toLocaleString()
                        }
                    </div>
                </td>
            </tr>
        </>
    )
}

export default SmetaTableItem