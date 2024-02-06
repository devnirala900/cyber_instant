const e = require("cors");
const catchAsyncError = require("../middleware/catchAsyncError");
const Categories_1 = require("../model/categories1Model");
const getDataUri = require("../utils/dataUri");
const ErrorHandler = require("../utils/errorhandler");
const cloudinary = require("cloudinary");

const addCategories = catchAsyncError(async (req, res, next) => {
    const {project_name,project_type,opentask,leader,status,modify_date,create_date} = req.body;

    const info = {
        project_name: project_name,
        project_type: project_type,
        opentask: opentask,
        leader: leader,
        status: status,
        modify_date: modify_date,
        create_date: create_date,
    }
    if (!project_name || !project_type || !opentask || !leader) {
        return next(new ErrorHandler(`Fields in required`, 400))
    }
    else {
        const isExitsUid = await Categories_1.findOne({ project_name })
        if (isExitsUid) {
            return next(new ErrorHandler(`project name is already isexits`, 404))
        }
        else {
            const data = await Categories_1.create(info)
            if (data) {
                res.status(200).json({
                    _id: data._id,
                    project_name: data.project_name,
                    project_type: data.project_type,
                    opentask: data.opentask,
                    leader: data.leader,
                    status: data.status,
                    modify_date: data.modify_date,
                    create_date: data.create_date,
                })
            }
            else {
                return next(new ErrorHandler(`data not found `, 404))
            }
        }
    }
})

const getAllCategories = catchAsyncError(async (req, res, next) => {
    const data = await Categories_1.find()
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
    const { _id } = req.params;
    console.log("ggg",_id)
    if (!_id) {
        return next(new ErrorHandler(`fields is required`))
    } else {
        const data = await Categories_1.findOne({ _id })
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
    const {project_name,project_type,opentask,leader,status,modify_date,create_date} = req.body;
    const info = {
        project_name: project_name,
        project_type: project_type,
        opentask: opentask,
        leader: leader,
        status: status,
        modify_date: modify_date,
        create_date: create_date,
       

    }
    const data = await Categories_1.findOne({ _id })
    if (data) {
        await Categories_1.findByIdAndUpdate(data._id, info, { new: true })
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
    const data = await Categories_1.findOne({ _id })
    if (data) {
        await Categories_1.findByIdAndDelete({ _id })
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
            // { uid: { $regex: req.query.search, $options: "i" } },
            {project_name: { $regex: req.query.search, $options: "i" } }
        ]
    }
        : {};

    const categories = await Categories_1.find(keyword)
    // .find(
    //     // { _id: { $ne: req.user._id } }
    // )
    res.send(categories)
})
module.exports = { addCategories, getAllCategories, getCategoriesById, updateCategoryById, deleteCategoriesById, searchCategories }