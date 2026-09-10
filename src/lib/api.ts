import { supabase } from './supabase';

// =====================================================
// ARTICLES
// =====================================================

export interface Article {
  id: string;
  title: string;
  journal?: string;
  pdf_url?: string;
  pdf_link?: string;
  doi?: string;
  date: string;
  published: boolean;
  authors?: Author[];
  created_at: string;
  updated_at: string;
}

export interface Author {
  id: string;
  name: string;
  link?: string;
  order_index: number;
}

export const articlesService = {
  async getAll(publishedOnly = true) {
    let query = supabase.from('articles').select('*, article_authors(*)').order('date', { ascending: false });
    if (publishedOnly) query = query.eq('published', true);
    const { data, error } = await query;
    if (error) throw error;
    return (data as any[]).map(article => ({
      ...article,
      authors: article.article_authors || []
    })) as Article[];
  },

  async getById(id: string) {
    const { data, error } = await supabase
      .from('articles')
      .select('*, article_authors(*)')
      .eq('id', id)
      .single();
    if (error) throw error;
    return {
      ...data,
      authors: data.article_authors || []
    } as Article;
  },

  async create(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>, authors: Omit<Author, 'id' | 'order_index'>[] = []) {
    const { data, error } = await supabase
      .from('articles')
      .insert({
        title: article.title,
        journal: article.journal,
        pdf_url: article.pdf_url,
        pdf_link: article.pdf_link,
        doi: article.doi,
        date: article.date,
        published: article.published || false,
      })
      .select()
      .single();

    if (error) throw error;

    // Add authors
    if (authors.length > 0) {
      const authorsWithArticleId = authors.map((a, idx) => ({
        article_id: data.id,
        name: a.name,
        link: a.link || null,
        order_index: idx,
      }));

      const { error: authorsError } = await supabase.from('article_authors').insert(authorsWithArticleId);
      if (authorsError) throw authorsError;
    }

    return data;
  },

  async update(id: string, article: Partial<Omit<Article, 'id' | 'created_at' | 'updated_at'>>, authors?: Omit<Author, 'id' | 'order_index'>[]) {
    const { data, error } = await supabase
      .from('articles')
      .update({
        title: article.title,
        journal: article.journal,
        pdf_url: article.pdf_url,
        pdf_link: article.pdf_link,
        doi: article.doi,
        date: article.date,
        published: article.published,
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    // Update authors if provided
    if (authors) {
      await supabase.from('article_authors').delete().eq('article_id', id);
      if (authors.length > 0) {
        const authorsWithArticleId = authors.map((a, idx) => ({
          article_id: id,
          name: a.name,
          link: a.link || null,
          order_index: idx,
        }));
        const { error: authorsError } = await supabase.from('article_authors').insert(authorsWithArticleId);
        if (authorsError) throw authorsError;
      }
    }

    return data;
  },

  async delete(id: string) {
    const { error } = await supabase.from('articles').delete().eq('id', id);
    if (error) throw error;
  },
};

// =====================================================
// EVENTS
// =====================================================

export interface Event {
  id: string;
  title: string;
  description?: string;
  location?: string;
  role?: string;
  start_date: string;
  end_date: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const eventsService = {
  async getAll(publishedOnly = true) {
    let query = supabase.from('events').select('*').order('start_date', { ascending: false });
    if (publishedOnly) query = query.eq('published', true);
    const { data, error } = await query;
    if (error) throw error;
    return data as Event[];
  },

  async getById(id: string) {
    const { data, error } = await supabase.from('events').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Event;
  },

  async create(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('events')
      .insert({
        title: event.title,
        description: event.description,
        location: event.location,
        role: event.role,
        start_date: event.start_date,
        end_date: event.end_date,
        published: event.published || false,
      })
      .select()
      .single();
    if (error) throw error;
    return data as Event;
  },

  async update(id: string, event: Partial<Omit<Event, 'id' | 'created_at' | 'updated_at'>>) {
    const { data, error } = await supabase
      .from('events')
      .update(event)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Event;
  },

  async delete(id: string) {
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) throw error;
  },
};

// =====================================================
// EXPERIENCES
// =====================================================

export interface Experience {
  id: string;
  position: string;
  location?: string;
  description?: string;
  start_date: string;
  end_date?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const experiencesService = {
  async getAll(publishedOnly = true) {
    let query = supabase.from('experiences').select('*').order('start_date', { ascending: false });
    if (publishedOnly) query = query.eq('published', true);
    const { data, error } = await query;
    if (error) throw error;
    return data as Experience[];
  },

  async getById(id: string) {
    const { data, error } = await supabase.from('experiences').select('*').eq('id', id).single();
    if (error) throw error;
    return data as Experience;
  },

  async create(experience: Omit<Experience, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('experiences')
      .insert({
        position: experience.position,
        location: experience.location,
        description: experience.description,
        start_date: experience.start_date,
        end_date: experience.end_date,
        published: experience.published || false,
      })
      .select()
      .single();
    if (error) throw error;
    return data as Experience;
  },

  async update(id: string, experience: Partial<Omit<Experience, 'id' | 'created_at' | 'updated_at'>>) {
    const { data, error } = await supabase
      .from('experiences')
      .update(experience)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Experience;
  },

  async delete(id: string) {
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) throw error;
  },
};

// =====================================================
// ABOUT (Single Type)
// =====================================================

export interface About {
  id: string;
  content: any;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const aboutService = {
  async get(publishedOnly = false) {
    let query = supabase.from('abouts').select('*').limit(1);
    if (publishedOnly) query = query.eq('published', true);
    const { data, error } = await query;
    if (error) throw error;
    return data?.[0] as About | undefined;
  },

  async upsert(content: any, published: boolean) {
    const existing = await this.get(false);

    if (existing) {
      const { data, error } = await supabase
        .from('abouts')
        .update({ content, published })
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      return data as About;
    } else {
      const { data, error } = await supabase
        .from('abouts')
        .insert({ content, published })
        .select()
        .single();
      if (error) throw error;
      return data as About;
    }
  },
};

// =====================================================
// CONTACT (Single Type)
// =====================================================

export interface Contact {
  id: string;
  email?: string;
  institution?: string;
  address?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const contactService = {
  async get(publishedOnly = false) {
    let query = supabase.from('contacts').select('*').limit(1);
    if (publishedOnly) query = query.eq('published', true);
    const { data, error } = await query;
    if (error) throw error;
    return data?.[0] as Contact | undefined;
  },

  async upsert(contact: Omit<Contact, 'id' | 'created_at' | 'updated_at'>) {
    const existing = await this.get(false);

    if (existing) {
      const { data, error } = await supabase
        .from('contacts')
        .update(contact)
        .eq('id', existing.id)
        .select()
        .single();
      if (error) throw error;
      return data as Contact;
    } else {
      const { data, error } = await supabase
        .from('contacts')
        .insert(contact)
        .select()
        .single();
      if (error) throw error;
      return data as Contact;
    }
  },
};

// =====================================================
// SOCIAL LINKS (Single Type - but stored as multiple records)
// =====================================================

export interface SocialLink {
  id: string;
  name: string;
  url: string;
  icon_url?: string;
  order_index: number;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export const socialLinksService = {
  async getAll(publishedOnly = true) {
    let query = supabase.from('social_links').select('*').order('order_index', { ascending: true });
    if (publishedOnly) query = query.eq('published', true);
    const { data, error } = await query;
    if (error) throw error;
    return data as SocialLink[];
  },

  async create(link: Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('social_links')
      .insert(link)
      .select()
      .single();
    if (error) throw error;
    return data as SocialLink;
  },

  async update(id: string, link: Partial<Omit<SocialLink, 'id' | 'created_at' | 'updated_at'>>) {
    const { data, error } = await supabase
      .from('social_links')
      .update(link)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as SocialLink;
  },

  async delete(id: string) {
    const { error } = await supabase.from('social_links').delete().eq('id', id);
    if (error) throw error;
  },

  async reorder(links: { id: string; order_index: number }[]) {
    for (const link of links) {
      const { error } = await supabase
        .from('social_links')
        .update({ order_index: link.order_index })
        .eq('id', link.id);
      if (error) throw error;
    }
  },
};
