import React, { Component, useState } from "react";
import store from "../../redux/store";
import { category, getCategory } from "./CategoriesDate";
import { getData } from '../../redux/actions/dataActions'
import { connect } from "react-redux";
//  Styles
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import DateFnsUtils from "@date-io/date-fns";
import DatePicker from "react-datepicker";
import { Dialog } from "primereact/dialog";
import { format } from "date-fns";
import Grid from "@material-ui/core/Grid";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { NIL as NIL_UUID } from "uuid";
import { RadioButton } from "primereact/radiobutton";
import { Toolbar } from "primereact/toolbar";
import "date-fns";
import "./Table.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "react-datepicker/dist/react-datepicker.css";


class Table extends Component {
  constructor(props){
    super(props);
    this.state = {
      categories: [],
      categoryDialog: false,
      deleteCategoryategoryDialog: false,
      newCategory: this.emptyCategory,
      selectedCategories: null,
      submitted: false,
      globalFilter: null,
      emptyCategory: {
      id: null,
      description: "",
      category: [...category],
      price: 0,
      date: "",
      } 
    };
  }
  render() {
    let { data,authenticated } = this.props;
    console.log('OUTPUT: Table -> render -> data', data)
    const categoryBodyTemplate = (data) => {
      return (
        <>
          <span className="p-column-title">Category</span>
          {data.category}
        </>
      );
    };
    const descriptionBodyTemplate = (data) => {
      return (
        <>
          <span className="p-column-title">Description</span>
          {data.description}
        </>
      );
    };
    const dateBodyTemplate = (data) => {
      return (
        <>
          <span className="p-column-title">Date</span>
          {data.date}
        </>
      );
    };
    const priceBodyTemplate = (data) => {
      return (
        <>
          <span className="p-column-title">Price</span>
          {`$ ${data.price}`}
        </>
      );
    };
  
    const formatCurrency = (value) => {
      return value.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    };
  
    const openNew = () => {
      this.setState((state) => ({
        newCategory: this.emptyCategory,
        submitted: false,
        categoryDialog: true,
      }));
    };
  
    function hideDialog() {
      console.log(this.state.emptyCategory)
      this.setState({
        submitted: false,
        categoryDialog: false,
      });
    };
    const hideDeleteCategoryDialog = () => {
      this.setState({ deleteCategoryDialog: false });
    };
  
    const saveCategory = () => {
      let state = { submitted: true };
      if (
        this.state.newCategory.id ||
        this.state.newCategory.description.trim()
      ) {
        let categories = [...this.state.categories];
  
        let newCategory = { ...this.state.newCategory };
        if (this.state.newCategory.id) {
          const index = this.state.categories.findIndex(
            (item) => item.id === this.state.newCategory.id
          );
          categories[index] = newCategory;
          this.toast.show({
            severity: "success",
            summary: "Successful",
            detail: "Category Updated",
            life: 3000,
          });
        } else {
          newCategory.id = NIL_UUID;
          newCategory.date = this.state.newCategory.date;
          categories.push(newCategory);
          this.toast.show({
            severity: "success",
            summary: "Successful",
            detail: "Category Created",
            life: 3000,
          });
        }
        state = {
          ...state,
          categories,
          categoryDialog: false,
          newCategory: this.emptyCategory,
        };
      }
      this.setState(state);
    };
  
    const editCategory = (newCategory) => {
      this.setState({
        newCategory: { ...newCategory },
        categoryDialog: true,
      });
    };
  
    const confirmDeleteCategory = (newCategory) => {
      this.setState({
        newCategory,
        deleteCategoryDialog: true,
      });
    };
  
    const deleteCategory = () => {
      let categories = this.state.categories.filter(
        (val) => val.id !== this.state.newCategory.id
      );
      this.setState({
        categories,
        deleteCategoryDialog: false,
        newCategory: this.emptyCategory,
      });
      this.toast.show({
        severity: "success",
        summary: "Successful",
        detail: "Category Deleted",
        life: 3000,
      });
    };
  
    const onCategoryChange = (e) => {
      let newCategory = { ...this.state.newCategory };
      newCategory["category"] = e.value;
      this.setState({ newCategory });
    };
  
    const onDateChange = (date) => {
      let newCategory = { ...this.state.newCategory };
      newCategory["date"] = format(date, "yyyy-MM-dd");
      this.setState({ newCategory });
    };
  
    const onInputChange = (e, name) => {
      const val = (e.target && e.target.value) || "";
      let newCategory = { ...this.state.newCategory };
      newCategory[`${name}`] = val;
      this.setState({ newCategory });
    };
  
    const onInputNumberChange = (e, description) => {
      const val = e.value || 0;
      let newCategory = { ...this.state.newCategory };
      newCategory[`${description}`] = val;
      this.setState({ newCategory });
    };
  
    const leftToolbarTemplate = () => {
      return (
        <>
          <Button
            label="New"
            icon="pi pi-plus"
            className="p-mr-2 btn"
            onClick={this.openNew}
          />
        </>
      );
    };
  
    const actionBodyTemplate = (rowData) => {
      return (
        <div className="button-wrapper">
          <Button
            icon="pi pi-pencil"
            className="p-button-rounded p-button-success p-mr-2 btn-small"
            style={{ marginRight: "20px" }}
            onClick={() => this.editCategory(rowData)}
          />
          <Button
            icon="pi pi-trash"
            className="p-button-rounded p-button-warning btn-small"
            onClick={() => this.confirmDeleteCategory(rowData)}
          />
        </div>
      );
    };
    const balance = () => {
      // console.log(this.state.categories);
      // const summ = this.state.categories
      //   .reduce((acc, value) => acc + value.price, 0)
      //   .toFixed(2);
  
      return (
        <div className="balance-wrapper">
          <div className="balance">
            <i
              className="fas fa-balance-scale-right fa-lg"
              style={{ color: "white" }}
            ></i>
          </div>
          <span className="sum">{``}</span>
          <i className="fas fa-dollar-sign fa-2x" style={{ color: "white" }}></i>
        </div>
      );
    };
  
    const Calendar = () => {
      const [startDate, setStartDate] = useState(new Date());
      return (
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      );
    };
    const header = () => {
      return (
        <div className="table-header">
          <h5 className="p-m-0">My Charges</h5>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              className="searchInput"
              type="search"
              onInput={(e) => this.setState({ globalFilter: e.target.value })}
              placeholder="Search..."
            />
          </span>
          {this.balance}
        </div>
      );
    };

    const categoryDialogFooter = (
      <>
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="btn footer-btn"
          onClick={hideDialog()}
        />
        <Button
          label="Save"
          icon="pi pi-check"
          className="btn footer-btn"
          onClick={this.saveCategory}
        />
      </>
    );

    const deleteCategoryDialogFooter = (
      <>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-text"
          onClick={this.hideDeleteCategoryDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-text"
          onClick={this.deleteCategory}
        />
      </>
    );

    return (
      <div className="datatable-responsive-demo">
        {data.length !== 0 && authenticated ? (
          <div className="card">
            <Toolbar
              className="p-mb-4 w-100"
              left={leftToolbarTemplate}
              right={balance}
            ></Toolbar>
            <DataTable
              ref={(el) => (this.dt = el)}
              value={this.state.categories}
              onSelectionChange={(e) =>
                this.setState({ selectedCategories: e.value })
              }
              className="p-datatable-responsive-demo"
              paginator
              rows={10}
              rowsPerPageOptions={[5, 10, 25]}
              paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
              currentPageReportTemplate="Showing {first} to {last} of {totalRecords} categories"
              globalFilter={this.state.globalFilter}
              header={header}
            >
              <Column
                field="category"
                header="Category"
                body={categoryBodyTemplate}
                sortable
              />
              <Column
                field="description"
                header="Description"
                body={descriptionBodyTemplate}
                sortable
              ></Column>
              <Column
                field="date"
                header="Date"
                body={dateBodyTemplate}
                sortable
              ></Column>
              <Column
                field="price"
                header="Price"
                body={priceBodyTemplate}
                sortable
              ></Column>
              <Column body={actionBodyTemplate}> </Column>
            </DataTable>
            <Dialog
              visible={this.state.categoryDialog}
              style={{ width: "450px", color: "white" }}
              header="Details"
              modal
              className="p-fluid"
              footer={categoryDialogFooter}
              onHide={hideDialog()}
            >
              <div className="p-field">
                <label className="p-mb-3">Category</label>
                <div className="p-formgrid p-grid">
                  {this.state.newCategory.category.map((item) => (
                    <div className="p-field-radiobutton p-col-6" key={item}>
                      <RadioButton
                        id={item.title}
                        name="category"
                        value={item.title}
                        onChange={this.onCategoryChange}
                        checked={this.state.newCategory.category === item.title}
                      />
                      <i className={`fas fa-${item.icon}`}></i>
                      <label htmlFor={item.title.toLowerCase()}>
                        {item.title}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-field">
                <label htmlFor="description">Description</label>
                <InputText
                  id="description"
                  value={this.state.newCategory.description}
                  onChange={(e) => this.onInputChange(e, "description")}
                  required
                  autoFocus
                  className={classNames({
                    "p-invalid":
                      this.state.submitted && !this.state.newCategory.dec,
                  })}
                />
              </div>

              <div className="p-formgrid p-grid">
                <div className="p-field p-col">
                  <label htmlFor="price">Price</label>
                  <InputNumber
                    id="price"
                    value={this.state.newCategory.price}
                    onValueChange={(e) => this.onInputNumberChange(e, "price")}
                    mode="currency"
                    currency="USD"
                    locale="en-US"
                  />
                </div>

                <div className="p-field p-col">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <KeyboardDatePicker
                        className="date"
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date"
                        value={
                          this.state.newCategory.date
                            ? Date.parse(this.state.newCategory.date)
                            : new Date()
                        }
                        onChange={this.onDateChange}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </div>
              </div>
            </Dialog>

            <Dialog
              visible={this.state.deleteCategoryDialog}
              style={{ width: "450px" }}
              header="Confirm"
              modal
              footer={deleteCategoryDialogFooter}
              onHide={this.hideDeleteCategoryDialog}
            >
              <div className="confirmation-content">
                <i
                  className="pi pi-exclamation-triangle p-mr-3"
                  style={{ fontSize: "2rem" }}
                />
                {this.state.newCategory && (
                  <span className="span-txt">
                    Are you sure you want to delete{" "}
                    <b>{this.state.newCategory.description}</b>?
                  </span>
                )}
              </div>
            </Dialog>
          </div>
        ) : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    data: state.data.data,
    authenticated: state.user.authenticated,
  };
}

export default connect(mapStateToProps)(Table);