"use client"

import type React from "react"
import { useState, useMemo } from "react"
import { ChevronUp, ChevronDown, ChevronsUpDown, Loader2 } from "lucide-react"
import { cn } from "../../lib/utils"

export interface Column<T> {
  key: keyof T | string
  header: string
  accessor?: (item: T) => React.ReactNode
  sortable?: boolean
  width?: string
  align?: "left" | "center" | "right"
}

export interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  loading?: boolean
  selectable?: boolean
  onRowSelect?: (selectedRows: T[]) => void
  className?: string
  emptyMessage?: string
  loadingMessage?: string
}

type SortDirection = "asc" | "desc" | null

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  className,
  emptyMessage = "No data available",
  loadingMessage = "Loading...",
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set())
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)

  // Sort data based on current sort state
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data

    return [...data].sort((a, b) => {
      const column = columns.find((col) => col.key === sortColumn)
      let aValue: any
      let bValue: any

      if (column?.accessor) {
        // For custom accessors, we need to extract the actual value for sorting
        // This is a simplified approach - in a real implementation you might want
        // to allow columns to specify a sortValue function
        aValue = column.accessor(a)
        bValue = column.accessor(b)
      } else {
        aValue = a[sortColumn as keyof T]
        bValue = b[sortColumn as keyof T]
      }

      // Handle different data types
      if (typeof aValue === "string" && typeof bValue === "string") {
        aValue = aValue.toLowerCase()
        bValue = bValue.toLowerCase()
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1
      return 0
    })
  }, [data, sortColumn, sortDirection, columns])

  // Handle column header click for sorting
  const handleSort = (column: Column<T>) => {
    if (!column.sortable) return

    const columnKey = column.key as string

    if (sortColumn === columnKey) {
      // Cycle through: asc -> desc -> null
      if (sortDirection === "asc") {
        setSortDirection("desc")
      } else if (sortDirection === "desc") {
        setSortDirection(null)
        setSortColumn(null)
      }
    } else {
      setSortColumn(columnKey)
      setSortDirection("asc")
    }
  }

  // Handle row selection
  const handleRowSelect = (index: number, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows)

    if (checked) {
      newSelectedRows.add(index)
    } else {
      newSelectedRows.delete(index)
    }

    setSelectedRows(newSelectedRows)

    // Call onRowSelect with actual data items
    const selectedData = Array.from(newSelectedRows).map((i) => sortedData[i])
    onRowSelect?.(selectedData)
  }

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIndices = new Set(sortedData.map((_, index) => index))
      setSelectedRows(allIndices)
      onRowSelect?.(sortedData)
    } else {
      setSelectedRows(new Set())
      onRowSelect?.([])
    }
  }

  // Check if all rows are selected
  const isAllSelected = selectedRows.size > 0 && selectedRows.size === sortedData.length
  const isIndeterminate = selectedRows.size > 0 && selectedRows.size < sortedData.length

  // Render sort icon
  const renderSortIcon = (column: Column<T>) => {
    if (!column.sortable) return null

    const columnKey = column.key as string
    const isActive = sortColumn === columnKey

    if (!isActive) {
      return <ChevronsUpDown className="ml-2 h-4 w-4 text-muted-foreground" />
    }

    return sortDirection === "asc" ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  // Render cell content
  const renderCellContent = (item: T, column: Column<T>) => {
    if (column.accessor) {
      return column.accessor(item)
    }
    return item[column.key as keyof T] as React.ReactNode
  }

  // Get alignment classes
  const getAlignmentClass = (align?: "left" | "center" | "right") => {
    switch (align) {
      case "center":
        return "text-center"
      case "right":
        return "text-right"
      default:
        return "text-left"
    }
  }

  if (loading) {
    return (
      <div className={cn("w-full", className)}>
        <div className="rounded-md border">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>{loadingMessage}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!loading && data.length === 0) {
    return (
      <div className={cn("w-full", className)}>
        <div className="rounded-md border">
          <div className="flex items-center justify-center py-12">
            <p className="text-muted-foreground">{emptyMessage}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                {selectable && (
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={isAllSelected}
                      ref={(input) => {
                        if (input) input.indeterminate = isIndeterminate
                      }}
                      onChange={(e) => handleSelectAll(e.target.checked)}
                      className="rounded border-input"
                      aria-label="Select all rows"
                    />
                  </th>
                )}
                {columns.map((column, index) => (
                  <th
                    key={`${column.key as string}-${index}`}
                    className={cn(
                      "px-4 py-3 font-medium text-left",
                      getAlignmentClass(column.align),
                      column.sortable && "cursor-pointer hover:bg-muted/80 transition-colors",
                    )}
                    style={{ width: column.width }}
                    onClick={() => handleSort(column)}
                  >
                    <div className="flex items-center">
                      {column.header}
                      {renderSortIcon(column)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedData.map((item, index) => (
                <tr
                  key={index}
                  className={cn(
                    "border-b transition-colors hover:bg-muted/50",
                    selectedRows.has(index) && "bg-muted/30",
                  )}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(index)}
                        onChange={(e) => handleRowSelect(index, e.target.checked)}
                        className="rounded border-input"
                        aria-label={`Select row ${index + 1}`}
                      />
                    </td>
                  )}
                  {columns.map((column, colIndex) => (
                    <td
                      key={`${column.key as string}-${colIndex}`}
                      className={cn("px-4 py-3", getAlignmentClass(column.align))}
                    >
                      {renderCellContent(item, column)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectable && selectedRows.size > 0 && (
        <div className="mt-2 text-sm text-muted-foreground">
          {selectedRows.size} of {sortedData.length} row(s) selected
        </div>
      )}
    </div>
  )
}
