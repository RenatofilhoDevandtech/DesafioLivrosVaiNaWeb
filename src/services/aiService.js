/**
 * AI Service for Book Donation Platform
 * Inspired by Claude Cookbooks (orchestrator-worker and structured output patterns)
 */

export const extractBookMetadata = async (description) => {
  // Simulate an AI thinking/processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  // In a real implementation, this would call the Claude API using the agentic patterns.
  // Here we simulate the "Programmatic Tool Calling" and "Structured Output" from the cookbooks.
  const lowercaseDesc = description.toLowerCase();
  
  // Basic simulation of entity extraction
  const metadata = {
    titulo: "",
    autor: "",
    categoria_id: ""
  };

  if (lowercaseDesc.includes("dom casmurro") || lowercaseDesc.includes("machado")) {
    metadata.titulo = "Dom Casmurro";
    metadata.autor = "Machado de Assis";
    metadata.categoria_id = "1"; // Assuming 1 is Classics/Literature
  } else if (lowercaseDesc.includes("clean code") || lowercaseDesc.includes("robert martin")) {
    metadata.titulo = "Clean Code";
    metadata.autor = "Robert C. Martin";
    metadata.categoria_id = "2"; // Assuming 2 is Technology
  } else if (lowercaseDesc.includes("atomic habits") || lowercaseDesc.includes("james clear")) {
    metadata.titulo = "Atomic Habits";
    metadata.autor = "James Clear";
    metadata.categoria_id = "3"; // Assuming 3 is Self-help
  } else {
    // If no specific book found, "extract" generic titles if they look like ones
    const words = description.split(' ');
    metadata.titulo = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    metadata.autor = "Autor Desconhecido";
    metadata.categoria_id = "1";
  }

  return metadata;
};

export const searchWithAI = (books, query) => {
  const lowercaseQuery = query.toLowerCase();
  
  // Simulate semantic search by matching keywords in title, author, or type
  return books.filter(book => {
    const searchContent = `${book.titulo} ${book.autor} ${book.type} ${book.status}`.toLowerCase();
    
    // Semantic logic for technology, careers, and social impact
    if (lowercaseQuery.includes("tecnologia") || lowercaseQuery.includes("computador") || lowercaseQuery.includes("programar") || lowercaseQuery.includes("carreira")) {
      return searchContent.includes("pdf") || searchContent.includes("computa") || searchContent.includes("tecnic") || searchContent.includes("js") || searchContent.includes("node");
    }
    
    if (lowercaseQuery.includes("doar") || lowercaseQuery.includes("ajudar") || lowercaseQuery.includes("impacto") || lowercaseQuery.includes("social")) {
      return book.type === 'donation' || searchContent.includes("social") || searchContent.includes("comunidade");
    }

    if (lowercaseQuery.includes("arte") || lowercaseQuery.includes("estilo") || lowercaseQuery.includes("design") || lowercaseQuery.includes("criativo")) {
      return searchContent.includes("css") || searchContent.includes("ui") || searchContent.includes("ux") || searchContent.includes("design");
    }

    return searchContent.includes(lowercaseQuery);
  });
};
