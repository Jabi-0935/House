import { Portion } from "../models/Portion.js";

export class DocumentService {

  static async addDocumentsToPortion(portionId, docsArray) {
    try {
      const portion = await Portion.findById(portionId);
      if (!portion) {
        throw new Error("Portion not found");
      }

      // Validate document format
      const validatedDocs = docsArray.map(doc => {
        if (!doc.type || !doc.url) {
          throw new Error("Document must have 'type' and 'url' fields");
        }
        return {
          type: doc.type,
          url: doc.url,
          note: doc.note || ""
        };
      });

      // Add documents to existing array
      portion.documents = portion.documents || [];
      portion.documents.push(...validatedDocs);

      await portion.save();

      return {
        portionId: portion._id,
        documentsAdded: validatedDocs.length,
        totalDocuments: portion.documents.length,
        documents: portion.documents
      };
    } catch (error) {
      throw new Error(`Error adding documents: ${error.message}`);
    }
  }

  static async removeDocumentFromPortion(portionId, documentIndex) {
    try {
      const portion = await Portion.findById(portionId);
      if (!portion) {
        throw new Error("Portion not found");
      }

      if (!portion.documents || documentIndex >= portion.documents.length) {
        throw new Error("Document not found");
      }

      // Remove document by index
      portion.documents.splice(documentIndex, 1);
      await portion.save();

      return {
        portionId: portion._id,
        remainingDocuments: portion.documents.length,
        documents: portion.documents
      };
    } catch (error) {
      throw new Error(`Error removing document: ${error.message}`);
    }
  }

  static async getPortionDocuments(portionId) {
    try {
      const portion = await Portion.findById(portionId, 'documents title');
      if (!portion) {
        throw new Error("Portion not found");
      }

      return {
        portionId: portion._id,
        portionTitle: portion.title,
        documents: portion.documents || []
      };
    } catch (error) {
      throw new Error(`Error fetching documents: ${error.message}`);
    }
  }
}