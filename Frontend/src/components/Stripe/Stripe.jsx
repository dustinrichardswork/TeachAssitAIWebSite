import React from 'react'
import { backend_url } from '../../util/variables'
import axios from 'axios';

const Stripe = () => {


    const checkout = () => {
        axios.post(`${backend_url}//payment/process`, {
            items: [
                { id: 1, quantity: 3 },
                { id: 2, quantity: 2 }
            ]
        })
            .then((res) => {
                console.log('Hello, ', res);
                alert('check console')
                if (res.statusText === 'OK') {
                    window.location.href = res.data.url
                }
            }).catch(e => {
                console.log(e);
                alert("error while checkout")
            }
            )
    }

    return (
        <div>
            <button onClick={checkout}>Checkout</button>
        </div>
    )
}

export default Stripe