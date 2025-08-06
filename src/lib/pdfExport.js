import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export function exportOrdersToPDF(orders, options = {}) {
  const {
    title = 'Food Orders Export',
    includeCustomer = true,
    includeNotes = true,
    includeAllergies = true,
    includeStatus = true,
    groupByItem = false
  } = options;

  // Create new PDF document
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text(title, 20, 20);
  
  // Add export date
  doc.setFontSize(12);
  doc.text(`Export Date: ${new Date().toLocaleDateString()}`, 20, 30);
  doc.text(`Total Orders: ${orders.length}`, 20, 40);

  let yPosition = 50;

  if (groupByItem) {
    // Group orders by item for supplier convenience
    const itemSummary = groupOrdersByItem(orders);
    
    doc.setFontSize(16);
    doc.text('Items Summary', 20, yPosition);
    yPosition += 10;

    // Create table data for items summary (without customizations)
    const itemTableData = Object.entries(itemSummary).map(([itemName, data]) => [
      itemName,
      data.totalQuantity,
      `£${data.totalValue.toFixed(2)}`
    ]);

    autoTable(doc, {
      startY: yPosition,
      head: [['Item', 'Total Qty', 'Total Value']],
      body: itemTableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185] },
      margin: { left: 20, right: 20 }
    });

    yPosition = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 20 : yPosition + 50;
  }

  // Add detailed orders section
  doc.setFontSize(16);
  doc.text('Detailed Orders', 20, yPosition);
  yPosition += 10;

  // Prepare table columns
  const columns = ['Order #', 'Items'];
  if (includeCustomer) columns.push('Customer');
  columns.push('Total');
  if (includeNotes) columns.push('Notes');
  if (includeAllergies) columns.push('Allergies');
  if (includeStatus) columns.push('Status');

  // Prepare table data
  const tableData = orders.map(order => {
    const row = [];
    
    // Order number
    row.push(order.orderNumber || order.order_number || 'N/A');
    
    // Items (format for readability with rich text for customizations)
    const itemsText = order.items ? 
      order.items.map(item => {
        const baseItem = `${item.name} (${item.quantity || 1}x)`;
        if (item.customisations?.length) {
          const customizations = item.customisations.map(c => c.name).join(', ');
          return baseItem + '\n  ➤ ' + customizations; // Using arrow symbol to highlight
        }
        return baseItem;
      }).join('\n\n') : 
      'No items';
    row.push(itemsText);
    
    // Customer (if included)
    if (includeCustomer) {
      row.push(order.customer || order.user_email || 'Guest');
    }
    
    // Total
    row.push(`£${(order.total || 0).toFixed(2)}`);
    
    // Notes (if included)
    if (includeNotes) {
      row.push(order.notes || '-');
    }
    
    // Allergies (if included)
    if (includeAllergies) {
      row.push(order.allergies || '-');
    }
    
    // Status (if included)
    if (includeStatus) {
      row.push(order.status || 'pending');
    }
    
    return row;
  });

  // Generate the table
  autoTable(doc, {
    startY: yPosition,
    head: [columns],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [41, 128, 185] },
    styles: { 
      cellPadding: 3,
      fontSize: 9,
      valign: 'top',
      lineColor: [200, 200, 200],
      lineWidth: 0.1
    },
    columnStyles: {
      1: { 
        cellWidth: 60, // Items column wider
        fontSize: 8
      }
    },
    didParseCell: function (data) {
      // Highlight customizations in the items column (column index 1)
      if (data.column.index === 1 && data.cell.text.length > 0) {
        const cellText = data.cell.text.join(' ');
        if (cellText.includes('➤')) {
          // Add background color to cells with customizations
          data.cell.styles.fillColor = [245, 255, 245]; // Very light green background
        }
      }
    },
    margin: { left: 20, right: 20 }
  });

  // Add summary at the bottom
  const totalValue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const finalY = doc.lastAutoTable?.finalY ? doc.lastAutoTable.finalY + 20 : yPosition + 100;
  
  doc.setFontSize(14);
  doc.text(`Total Orders Value: £${totalValue.toFixed(2)}`, 20, finalY);

  // Save the PDF
  const filename = `food-orders-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}

function groupOrdersByItem(orders) {
  const itemSummary = {};
  
  orders.forEach(order => {
    if (order.items) {
      order.items.forEach(item => {
        const itemName = item.name;
        const quantity = item.quantity || 1;
        const itemValue = item.price * quantity;
        
        if (!itemSummary[itemName]) {
          itemSummary[itemName] = {
            totalQuantity: 0,
            totalValue: 0
          };
        }
        
        itemSummary[itemName].totalQuantity += quantity;
        itemSummary[itemName].totalValue += itemValue;
      });
    }
  });
  
  return itemSummary;
}
