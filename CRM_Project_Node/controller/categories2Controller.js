const catchAsyncError = require("../middleware/catchAsyncError");
const Categories_2 = require("../model/categories2Model");
const ErrorHandler = require("../utils/errorhandler");

const addCategories = catchAsyncError(async (req, res, next) => {
    const { created_by,subject,status,assign_to,date,details } = req.body;

    const info = {
        created_by: created_by,
        subject: subject,
        status: status,
        assign_to: assign_to,
        date: date,
        details: details 
        
    }
    console.log("bhiya data",info);
    if (!created_by || !subject || !status || !assign_to) {
        return next(new ErrorHandler(`Fields in required`, 400))
    }
    else {
        const isExitsUid = await Categories_2.findOne({ created_by })
        if (isExitsUid) {
            return next(new ErrorHandler(`uid is alredy isexits`,404))
        } else {
            const data = await Categories_2.create(info)
            if (data) {
                res.status(200).json({
                    created_by: data.created_by,
                    subject: data.subject,
                    status: data.status,
                    assign_to:data.assign_to,
                    date:data.date,
                    details:data.details
                })
                console.log("gggg",data)
            }
            else {
                return next(new ErrorHandler(`data not found `, 404))
            }
        }
    }
})

const getAllCategories = catchAsyncError(async (req, res, next) => {
    const data = await Categories_2.find()
    if (data) {
        res.status(200).json({
            data
        })
    }
    else {
        return next(new ErrorHandler(`categories not found`, 404))
    }
})

const getCategoriesById = catchAsyncError(async (req, res, next) => {
    const { uid } = req.query;
    if (!uid) {
        return next(new ErrorHandler(`fields is required`))
    } else {
        const data = await Categories_2.findOne({ uid })
        if (data) {
            res.status(200).json({
                categories1: data
            })
        }
        else {
            res.status(200).json({
                categories1: data
            })
            // return next(new ErrorHandler(`categories not found`, 404))
        }
    }
})

const updateCategoryById = catchAsyncError(async (req, res, next) => {
    const { _id } = req.params
    const { uid, name, number, address, field1, field2, field3, field4, field5, field6, field7, field8, field9, field10, field11, field12 } = req.body;
    const info = {
        uid: uid,
        name: name,
        number: number,
        address: address,
        field1: field1,
        field2: field2,
        field3: field3,
        field4: field4,
        field5: field5,
        field6: field6,
        field7: field7,
        field8: field8,
        field9: field9,
        field10: field10,
        field11: field11,
        field12: field12
    }
    const data = await Categories_2.findOne({ _id })
    if (data) {
        await Categories_2.findByIdAndUpdate(data._id, info, { new: true })
        res.status(200).json({
            message: "Update Sucessfully"
        })
    }
    else {
        return next(new ErrorHandler(`Categories not found`, 404))
    }
})

const deleteCategoriesById = catchAsyncError(async (req, res, next) => {
    const { _id } = req.params;
    const data = await Categories_2.findOne({ _id })
    if (data) {
        await Categories_2.findByIdAndDelete({ _id })
        res.status(200).json({
            message: "delete successful"
        })
    }
    else {
        return next(new ErrorHandler(`categories not found`, 404))
    }
})

const searchCategories = catchAsyncError(async (req, res, next) => {
    const keyword = req.query.search ? {
        $or: [
            { uid: { $regex: req.query.search, $options: "i" } },
            // { name: { $regex: req.query.search, $options: "i" } }
        ]
    }
        : {};

    const categories = await Categories_2.find(keyword)
    // .find(
    //     // { _id: { $ne: req.user._id } }
    // )
    res.send(categories)
})

module.exports = { addCategories, getAllCategories, getCategoriesById, updateCategoryById, deleteCategoriesById, searchCategories }