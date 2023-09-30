import { useEffect, useState } from 'react';
import SmetaTableItem from './SmetaTableItem';
const SmetaTable = ({ options, setTotalPrice, index}) => {
    const [count, setCount] = useState([{}])
    const [name, setName] = useState("")
    const [allprice, setAllPrice] = useState(0)
    const lastIndex = count?.length - 1



    // console.log(count);

    useEffect(() => {
        const data = {
            name: name,
            products: count,
            allPrice: allprice
        }
        localStorage.setItem(`data${index}`, JSON.stringify(data))
    }, [name,count,allprice])
    return (
        <div className="obj_item_table">
            <div className="form_input">
                <input type="text"
                    placeholder='Bo`lim nomini kiriting !'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th className='th_first'>№</th>
                        <th>Tovar nomi</th>
                        <th>O'lchov birligi</th>
                        <th>Soni</th>
                        <th>Narxi</th>
                        <th>Umumiy narxi</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        count.map((item, index) => (
                            <SmetaTableItem options={options} item={item} index={index} lastIndex={lastIndex} count={count} setCount={setCount} setAllPrice={setAllPrice} setTotalPrice={setTotalPrice} />
                        ))
                    }

                </tbody>
            </table>
            <div className="form_text">
                <p>
                    Umumiy narxi
                </p>
                <span>
                    {allprice?.toLocaleString()} so'm
                </span>
            </div>
        </div>
    )
}

export default SmetaTable