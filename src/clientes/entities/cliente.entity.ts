import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class Cliente {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'nombre' })
  public nombre: string;

  @Column({ name: 'tipo_identificacion_id' })
  public tipo_identificacion_id: number;

  @Column({ name: 'numero_identificacion', unique: true })
  public numero_identificacion: string;

  @Column({ name: 'genero_id' })
  public genero_id: number;

  @Column({ name: 'fecha_creacion' })
  public fecha_creacion: Date;

  @Column({ name: 'fecha_modificacion' })
  public fecha_modificacion: Date;

  @Column({ name: 'eliminado' })
  public eliminado: number;
}
