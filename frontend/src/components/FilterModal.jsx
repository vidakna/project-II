import React, {useState, useRef, useEffect} from 'react';
import axios from "axios";
import {base_url, config} from "../utills/axiosConfig";
import ProductCard from "./ProductCard";

function FilterModal() {
    const formRef = useRef(null);
    const [productKind , setProductKind] = useState("")
    const [favBrand , setFavBrand] = useState("")
    const [color , setColor] = useState("")
    const [startPrice , setStartPrice] = useState(0)
    const [endPrice , setEndPrice] = useState(0)
    const [grid, setGrid] = useState(3);

    // const modalBackdrop = document.querySelector(".modal-backdrop.show");
    // if (modalBackdrop !== null) {
    //   modalBackdrop.classList.add("productModal");
    // }


    const q1Handler = event => {
        setProductKind(event.target.value);
    };

    const q2Handler = event => {
        setFavBrand(event.target.value);
    };

    const q3Handler = event => {
        setColor(event.target.value);
    };

    const startPriceHandler = event => {
        setStartPrice(event.target.value);
    };

    const endPriceHandler = event => {
        setEndPrice(event.target.value);
    };


    const [categories , setCategories] = useState(null)
    const [brands , setBrands] = useState(null)

    useEffect(()=>{
        axios.get(`${base_url}category`).then((res) => {
            setCategories(res.data)
        }).catch((e)=>{
            console.error(e)
        })

        axios.get(`${base_url}brand`).then((res) => {
            setBrands(res.data)
        }).catch((e)=>{
            console.error(e)
        })
    } , [])

    const postBody = {
        productKind: productKind,
        favBrand: favBrand,
        color: color,
        startPrice: startPrice,
        endPrice: endPrice
    }

    const [selectedProducts , setSelectedProducts] = useState([])
    const [loading , setLoading] = useState(false)

    const handleIwant = () =>{
        setProductKind("")
        setFavBrand("")
        setColor("")
        setStartPrice(0)
        setEndPrice(0)
        setSelectedProducts([])

        if (formRef.current) {
            formRef.current.reset();
        }
    }

    const search = (event) =>{
        event.preventDefault();
        setLoading(true)
        axios.post(`${base_url}product/filter-products` , postBody).then((res) => {
            setSelectedProducts(res.data)
            setLoading(false)
            console.log(selectedProducts)
        }).catch((e)=>{
            console.error(e)
        })
    }

    return (
        <div >
            <button type="button" className="btn btn-primary" data-toggle="modal" onClick={handleIwant} data-target="#myModal">
                I want
            </button>

            <div className="modal fade productModal"  id="myModal"  tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">I Want</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>


                        <div className="modal-body" style={{"background" : "rgb(245, 245, 245)"}}>
                            <form action="" ref={formRef}>
                            <label htmlFor="">What kind of product are you looking for?</label>

                            <div className="container">
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                                    {categories && categories.map((e) =>{
                                        return (

                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="q1"
                                                       id="exampleRadios1" value={e.title} onChange={q1Handler}></input>
                                                <label className="form-check-label" htmlFor="q1">
                                                    {e.title}
                                                </label>

                                            </div>

                                        )
                                    })}
                                </div>
                            </div>


                            <label htmlFor=""> What is your favourite brand?</label>

                            <div className="container">
                                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                                    {brands && brands.map((e) =>{
                                        return (

                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="q2"
                                                   id="exampleRadios1" value={e.title} onChange={q2Handler}></input>
                                            <label className="form-check-label" htmlFor="q2">
                                                {e.title}
                                            </label>

                                        </div>

                                        )
                                    })}
                                </div>
                            </div>


                            <label htmlFor="">Color?</label>
                            <div style={{"display" : "flex" , "justifyContent" : "space-between" , "width" : "75%"}}>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="q3"
                                           id="exampleRadios1" value="Red" onChange={q3Handler}></input>
                                    <label className="form-check-label" htmlFor="q3">
                                        Red
                                    </label>

                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="q3"
                                           id="exampleRadios1" value="Green" onChange={q3Handler}></input>
                                    <label className="form-check-label" htmlFor="q3">
                                        Green
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="q3"
                                           id="exampleRadios1" value="Yellow" onChange={q3Handler}></input>
                                    <label className="form-check-label" htmlFor="q3">
                                        Yellow
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="q3"
                                           id="exampleRadios1" value="Blue" onChange={q3Handler}></input>
                                    <label className="form-check-label" htmlFor="q3">
                                        Blue
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="q3"
                                           id="exampleRadios1" value="White" onChange={q3Handler}></input>
                                    <label className="form-check-label" htmlFor="q3">
                                        White
                                    </label>
                                </div>
                            </div>

                            <label htmlFor="">Price Range</label>
                            <div className="row">
                                <div className="col p-0">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <input type="number" className="form-control" id="inputPassword2"
                                               placeholder="start price" onChange={startPriceHandler}></input>
                                    </div>
                                </div>
                                <div className="col">
                                    <div className="form-group mx-sm-3 mb-2">
                                        <input type="number" className="form-control" id="inputPassword2"
                                               placeholder="end price" onChange={endPriceHandler}></input>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button className="btn btn-sm btn-warning" onClick={search}>
                                    search
                                </button>
                            </div>
                            </form>




                            {loading && (
                                <div className="spinner-border text-warning" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            )}

                            {!loading && selectedProducts.length !== 0 &&(

                                <div className="products-list pb-5">
                                    <div className="d-flex gap-10 flex-wrap">

                                        <ProductCard
                                            grid={grid}
                                            data={selectedProducts? selectedProducts: []} />

                                    </div>
                                </div>

                            )}

                        </div>




                        {/*<div className="modal-footer">*/}
                        {/*    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>*/}
                        {/*    <button type="button" className="btn btn-primary">Save changes</button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilterModal;
