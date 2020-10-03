import React, { Component, useState } from "react";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import classNames from "classnames";
import { DataTable } from "primereact/datatable";
import DateFnsUtils from "@date-io/date-fns";
import DatePicker from "react-datepicker";
import { Dialog } from "primereact/dialog";
import { format } from "date-fns";
import { getCategory } from "./CategoriesDate";
import Grid from "@material-ui/core/Grid";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import { NIL as NIL_UUID } from "uuid";
import { RadioButton } from "primereact/radiobutton";
import { Toast } from "primereact/toast";
import { Toolbar } from "primereact/toolbar";
import "date-fns";
import "./Table";
import "./Table.css";
import "primeicons/primeicons.css";
import "primereact/resources/themes/md-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "react-datepicker/dist/react-datepicker.css";

export default class Table extends Component {
  emptyCategory = {
    id: null,
    description: "",
    category: [...getCategory],
    price: 0,
    date: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      categories: [...getCategory],
      categoryDialog: false,
      deleteCategoryategoryDialog: false,
      newCategory: this.emptyCategory,
      selectedCategories: null,
      submitted: false,
      globalFilter: null,
    };

  }

  categoryBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Category</span>
        {rowData.category}
      </>
    );
  };
  descriptionBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Description</span>
        {rowData.description}
      </>
    );
  };

  formatCurrency = (value) => {
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  openNew = () => {
    this.setState(state => ({
      newCategory: this.emptyCategory,
      submitted: false,
      categoryDialog: true,
    }))
  };

  hideDialog = () => {
    this.setState({
      submitted: false,
      categoryDialog: false,
    });
  };

  hideDeleteCategoryDialog = () => {
    this.setState({ deleteCategoryDialog: false });
  };

  saveCategory = () => {
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

  editCategory = (newCategory) => {
    this.setState({
      newCategory: { ...newCategory },
      categoryDialog: true,
    });
  };

  confirmDeleteCategory = (newCategory) => {
    this.setState({
      newCategory,
      deleteCategoryDialog: true,
    });
  };

  deleteCategory = () => {
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

  onCategoryChange = (e) => {
    let newCategory = { ...this.state.newCategory };
    newCategory["category"] = e.value;
    this.setState({ newCategory });
  };

  onDateChange = (date) => {
    let newCategory = { ...this.state.newCategory };
    newCategory["date"] = format(date, "yyyy-MM-dd");
    this.setState({ newCategory });
  };

  onInputChange = (e, name) => {
    const val = (e.target && e.target.value) || "";
    let newCategory = { ...this.state.newCategory };
    newCategory[`${name}`] = val;
    this.setState({ newCategory });
  };

  onInputNumberChange = (e, description) => {
    const val = e.value || 0;
    let newCategory = { ...this.state.newCategory };
    newCategory[`${description}`] = val;
    this.setState({ newCategory });
  };

  leftToolbarTemplate = () => {
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

  dateBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Date</span>
        {rowData.date}
      </>
    );
  };
  priceBodyTemplate = (rowData) => {
    return (
      <>
        <span className="p-column-title">Price</span>
        {`$ ${rowData.price}`}
      </>
    );
  };
  actionBodyTemplate = (rowData) => {
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
  balance = () => {
    const summ = this.state.categories.reduce(
      (acc, value) => acc + value.price,
      0
    );
 
    return (
      <div className="balance-wrapper">
        <div className="balance"><i className="fas fa-balance-scale-right fa-lg" style={{ color: "white" }}></i></div>
        <span className="sum">{`${summ}`}</span><i className="fas fa-dollar-sign fa-2x" style={{color:"white"}}></i>
      </div>
    );
  };

  Calendar = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    );
  };
 
  render() {
    const header = (
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

    const categoryDialogFooter = (
      <>
        <Button
          label="Cancel"
          icon="pi pi-times"
          className="btn footer-btn"
          onClick={this.hideDialog}
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
        <Toast ref={(el) => (this.toast = el)} />
        <div className="card">
          <Toolbar
            className="p-mb-4"
            left={this.leftToolbarTemplate}
            right={this.balance}
          ></Toolbar>
          <DataTable
            ref={(el) => (this.dt = el)}
            value={this.state.categories}
            // selection={this.state.selectedCategories}
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
              body={this.categoryBodyTemplate}
              sortable
            />
            <Column
              field="description"
              header="Description"
              body={this.descriptionBodyTemplate}
              sortable
            ></Column>
            <Column
              field="date"
              header="Date"
              body={this.dateBodyTemplate}
              sortable
            ></Column>
            <Column
              field="price"
              header="Price"
              body={this.priceBodyTemplate}
              sortable
            ></Column>
            <Column body={this.actionBodyTemplate}> </Column>
          </DataTable>
          <Dialog
            visible={this.state.categoryDialog}
            style={{ width: "450px", color: "white" }}
            header="Details"
            modal
            className="p-fluid"
            footer={categoryDialogFooter}
            onHide={this.hideDialog}
          >
            <div className="p-field">
              <label className="p-mb-3">Category</label>
              <div className="p-formgrid p-grid">
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    id="category1"
                    name="category"
                    value="Salary"
                    onChange={this.onCategoryChange}
                    checked={this.state.newCategory.category === "Salary"}
                  />

                  <i className="fas fa-money-bill-alt"></i>
                  <label htmlFor="category1">Salary</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    id="category2"
                    name="category"
                    value="Accessories"
                    onChange={this.onCategoryChange}
                    checked={this.state.newCategory.category === "Accessories"}
                  />

                  <i className="fas fa-ring"></i>
                  <label htmlFor="category1">Accessories</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    id="category3"
                    name="category"
                    value="Clothes"
                    onChange={this.onCategoryChange}
                    checked={this.state.newCategory.category === "Clothes"}
                  />
                  <i className="fas fa-tshirt"></i>
                  <label htmlFor="category2">Clothes</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    id="category4"
                    name="category"
                    value="Electronics"
                    onChange={this.onCategoryChange}
                    checked={this.state.newCategory.category === "Electronics"}
                  />
                  <i className="fas fa-laptop"></i>

                  <label htmlFor="category3">Electronics</label>
                </div>

                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    id="category5"
                    name="category"
                    value="Sport"
                    onChange={this.onCategoryChange}
                    checked={this.state.newCategory.category === "Sport"}
                  />
                  <i className="fas fa-volleyball-ball"></i>
                  <label htmlFor="category4">Sport</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    id="category6"
                    name="category"
                    value="Food"
                    onChange={this.onCategoryChange}
                    checked={this.state.newCategory.category === "Food"}
                  />
                  <i className="fas fa-apple-alt"></i>
                  <label htmlFor="category5">Food</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    id="category7"
                    name="category"
                    value="Restourant"
                    onChange={this.onCategoryChange}
                    checked={this.state.newCategory.category === "Restourant"}
                  />
                  <i className="fas fa-utensils"></i>
                  <label htmlFor="category6">Restourant</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    id="category8"
                    name="category"
                    value="Utility bills"
                    onChange={this.onCategoryChange}
                    checked={
                      this.state.newCategory.category === "Utility bills"
                    }
                  />
                  <i className="fas fa-faucet"></i>
                  <label htmlFor="category7">Utility bills</label>
                </div>

                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    id="category9"
                    name="category"
                    value="Pets"
                    onChange={this.onCategoryChange}
                    checked={this.state.newCategory.category === "Pets"}
                  />
                  <i className="fas fa-paw"></i>
                  <label htmlFor="category8">Pets</label>
                </div>
                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    id="category10"
                    name="category"
                    value="Vacation"
                    onChange={this.onCategoryChange}
                    checked={this.state.newCategory.category === "Vacation"}
                  />
                  <i className="fas fa-plane"></i>
                  <label htmlFor="category9">Vacation</label>
                </div>

                <div className="p-field-radiobutton p-col-6">
                  <RadioButton
                    id="category11"
                    name="category"
                    value="Another category"
                    onChange={this.onCategoryChange}
                    checked={
                      this.state.newCategory.category === "Another category"
                    }
                  />
                  <i className="fas fa-question"></i>
                  <label htmlFor="category10">Another category</label>
                </div>
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
                      value={this.state.newCategory.date ? Date.parse(this.state.newCategory.date) : new Date()}
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
      </div>
    );
  }
}
